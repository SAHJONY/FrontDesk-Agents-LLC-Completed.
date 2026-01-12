"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
exports.sendSupportEmail = sendSupportEmail;
exports.sendSalesEmail = sendSalesEmail;
exports.sendBillingEmail = sendBillingEmail;
exports.sendOnboardingEmail = sendOnboardingEmail;
exports.sendAgentEmail = sendAgentEmail;
exports.sendSystemEmail = sendSystemEmail;
exports.getDepartmentEmailStats = getDepartmentEmailStats;
exports.getAgentEmailStats = getAgentEmailStats;
var resend_1 = require("resend");
var outlookService_1 = require("./outlookService");
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
// Email configuration
var EMAIL_CONFIG = {
    domain: 'frontdeskagents.com',
    replyTo: 'noreply@frontdeskagents.com',
    departments: {
        support: 'support@frontdeskagents.com',
        sales: 'sales@frontdeskagents.com',
        billing: 'billing@frontdeskagents.com',
        onboarding: 'onboarding@frontdeskagents.com',
        technical: 'technical@frontdeskagents.com',
        compliance: 'compliance@frontdeskagents.com',
        admin: 'admin@frontdeskagents.com',
        noreply: 'noreply@frontdeskagents.com',
    },
};
/**
 * Get the from address based on department or agent
 */
function getFromAddress(department, agentId, agentName) {
    if (agentId) {
        return "Agent ".concat(agentName || agentId, " <agent-").concat(agentId, "@").concat(EMAIL_CONFIG.domain, ">");
    }
    if (agentName) {
        return "Agent ".concat(agentName, " <agent-").concat(agentName.toLowerCase().replace(/\s+/g, '-'), "}@").concat(EMAIL_CONFIG.domain, ">");
    }
    if (department && EMAIL_CONFIG.departments[department]) {
        var deptName = department.charAt(0).toUpperCase() + department.slice(1);
        return "".concat(deptName, " Team <").concat(EMAIL_CONFIG.departments[department], ">");
    }
    return "FrontDesk Agents <".concat(EMAIL_CONFIG.departments.noreply, ">");
}
/**
 * Send an email through the platform
 */
function sendEmail(options) {
    return __awaiter(this, void 0, void 0, function () {
        var useOutlook, fromAddress, outlookResult, error_1, fromAddress, fromAddress, emailData, result, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    useOutlook = options.department && ['admin', 'compliance', 'technical'].includes(options.department);
                    if (!useOutlook) return [3 /*break*/, 8];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 8]);
                    fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
                    return [4 /*yield*/, (0, outlookService_1.sendOutlookEmail)({
                            to: options.to,
                            subject: options.subject,
                            html: options.html,
                            text: options.text,
                            cc: options.cc,
                            bcc: options.bcc,
                            attachments: options.attachments,
                        })];
                case 2:
                    outlookResult = _c.sent();
                    if (!outlookResult.success) return [3 /*break*/, 4];
                    return [4 /*yield*/, logEmail({
                            fromAddress: fromAddress,
                            toAddress: options.to,
                            subject: options.subject,
                            department: options.department,
                            agentId: options.agentId,
                            status: 'sent_outlook',
                        })];
                case 3:
                    _c.sent();
                    return [2 /*return*/, { success: true }];
                case 4: throw new Error(outlookResult.error || 'Outlook email sending failed');
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _c.sent();
                    console.error('Outlook email sending failed:', error_1);
                    fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
                    return [4 /*yield*/, logEmail({
                            fromAddress: fromAddress,
                            toAddress: options.to,
                            subject: options.subject,
                            department: options.department,
                            agentId: options.agentId,
                            status: 'failed_outlook',
                            errorMessage: error_1.message,
                        })];
                case 7:
                    _c.sent();
                    return [2 /*return*/, { success: false, error: error_1.message }];
                case 8:
                    _c.trys.push([8, 11, , 13]);
                    fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
                    emailData = {
                        from: fromAddress,
                        to: Array.isArray(options.to) ? options.to : [options.to],
                        subject: options.subject,
                        replyTo: EMAIL_CONFIG.replyTo,
                    };
                    if (options.html) {
                        emailData.html = options.html;
                    }
                    if (options.text) {
                        emailData.text = options.text;
                    }
                    if (options.cc) {
                        emailData.cc = Array.isArray(options.cc) ? options.cc : [options.cc];
                    }
                    if (options.bcc) {
                        emailData.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc];
                    }
                    if (options.attachments) {
                        emailData.attachments = options.attachments;
                    }
                    return [4 /*yield*/, resend.emails.send(emailData)];
                case 9:
                    result = _c.sent();
                    // Log email to database (implement this based on your database setup)
                    return [4 /*yield*/, logEmail({
                            fromAddress: fromAddress,
                            toAddress: options.to,
                            subject: options.subject,
                            department: options.department,
                            agentId: options.agentId,
                            resendId: (_a = result.data) === null || _a === void 0 ? void 0 : _a.id,
                            status: 'sent_resend',
                        })];
                case 10:
                    // Log email to database (implement this based on your database setup)
                    _c.sent();
                    return [2 /*return*/, { success: true, messageId: (_b = result.data) === null || _b === void 0 ? void 0 : _b.id }];
                case 11:
                    error_2 = _c.sent();
                    console.error('Email sending failed:', error_2);
                    // Log failed email
                    return [4 /*yield*/, logEmail({
                            fromAddress: getFromAddress(options.department, options.agentId, options.agentName),
                            toAddress: options.to,
                            subject: options.subject,
                            department: options.department,
                            agentId: options.agentId,
                            status: 'failed',
                            errorMessage: error_2.message,
                        })];
                case 12:
                    // Log failed email
                    _c.sent();
                    return [2 /*return*/, { success: false, error: error_2.message }];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Send email to support department
 */
function sendSupportEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    department: 'support',
                })];
        });
    });
}
/**
 * Send email from sales department
 */
function sendSalesEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    department: 'sales',
                })];
        });
    });
}
/**
 * Send email from billing department
 */
function sendBillingEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    department: 'billing',
                })];
        });
    });
}
/**
 * Send email from onboarding department
 */
function sendOnboardingEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    department: 'onboarding',
                })];
        });
    });
}
/**
 * Send email from a specific agent
 */
function sendAgentEmail(to, subject, html, agentId, agentName, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    agentId: agentId,
                    agentName: agentName,
                })];
        });
    });
}
/**
 * Send system notification email (no-reply)
 */
function sendSystemEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sendEmail({
                    to: to,
                    subject: subject,
                    html: html,
                    text: text,
                    department: 'noreply',
                })];
        });
    });
}
/**
 * Log email to database
 */
function logEmail(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // TODO: Implement database logging using Supabase
                // This will store all email activity for tracking and analytics
                console.log('Email log:', data);
            }
            catch (error) {
                console.error('Failed to log email:', error);
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Get email statistics for a department
 */
function getDepartmentEmailStats(_department_1) {
    return __awaiter(this, arguments, void 0, function (_department, _days) {
        if (_days === void 0) { _days = 30; }
        return __generator(this, function (_a) {
            // TODO: Implement database query for email statistics
            return [2 /*return*/, {
                    sent: 0,
                    delivered: 0,
                    opened: 0,
                    clicked: 0,
                    bounced: 0,
                }];
        });
    });
}
/**
 * Get email statistics for an agent
 */
function getAgentEmailStats(_agentId_1) {
    return __awaiter(this, arguments, void 0, function (_agentId, _days) {
        if (_days === void 0) { _days = 30; }
        return __generator(this, function (_a) {
            // TODO: Implement database query for email statistics
            return [2 /*return*/, {
                    sent: 0,
                    delivered: 0,
                    opened: 0,
                    clicked: 0,
                    bounced: 0,
                }];
        });
    });
}
