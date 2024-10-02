import PageHeader from "@/components/page-header";

export default function Layout({ children }) {
  return (
    <>
      <PageHeader className="my-8" />
      <main className="flex-1">{children}</main>
      <footer className="text-center">Footer</footer>
    </>
  );
}
