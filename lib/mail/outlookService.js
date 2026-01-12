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
exports.sendOutlookEmail = sendOutlookEmail;
var microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
// Placeholder for an access token. In a real application, this would be dynamically fetched.
// For a server-side application, you'd typically use client credentials flow or similar.
// For now, we'll assume an environment variable or a secure token retrieval mechanism.
var getAccessToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        accessToken = process.env.OUTLOOK_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error('OUTLOOK_ACCESS_TOKEN is not configured.');
        }
        return [2 /*return*/, accessToken];
    });
}); };
function sendOutlookEmail(options) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken_1, client, recipients, ccRecipients, bccRecipients, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getAccessToken()];
                case 1:
                    accessToken_1 = _a.sent();
                    client = microsoft_graph_client_1.Client.init({
                        authProvider: function (done) {
                            done(null, accessToken_1);
                        },
                    });
                    recipients = (Array.isArray(options.to) ? options.to : [options.to]).map(function (email) { return ({
                        emailAddress: { address: email }
                    }); });
                    ccRecipients = options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]).map(function (email) { return ({
                        emailAddress: { address: email }
                    }); }) : undefined;
                    bccRecipients = options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]).map(function (email) { return ({
                        emailAddress: { address: email }
                    }); }) : undefined;
                    message = {
                        subject: options.subject,
                        body: {
                            contentType: options.html ? 'HTML' : 'Text',
                            content: options.html || options.text || '',
                        },
                        toRecipients: recipients,
                    };
                    if (ccRecipients) {
                        message.ccRecipients = ccRecipients;
                    }
                    if (bccRecipients) {
                        message.bccRecipients = bccRecipients;
                    }
                    if (options.attachments && options.attachments.length > 0) {
                        message.attachments = options.attachments.map(function (att) { return ({
                            '@odata.type': '#microsoft.graph.fileAttachment',
                            name: att.filename,
                            contentType: att.contentType || 'application/octet-stream',
                            contentBytes: (att.content instanceof Buffer) ? att.content.toString('base64') : Buffer.from(att.content).toString('base64'),
                        }); });
                    }
                    return [4 /*yield*/, client.api('/me/sendMail').post({ message: message, saveToSentItems: true })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { success: true }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Outlook email sending failed:', error_1);
                    return [2 /*return*/, { success: false, error: error_1.message }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
