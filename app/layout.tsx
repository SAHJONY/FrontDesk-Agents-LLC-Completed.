// app/layout.tsx
// import TopNav from '@/components/top-nav'; // Comment this out for now

export default function Layout({ children }) {
  return (
    <div>
      {/* <TopNav /> */} {/* Remove this line */}
      {children}
    </div>
  );
}
