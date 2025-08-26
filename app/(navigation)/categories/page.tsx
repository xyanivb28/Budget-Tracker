import CategoriesSection from "./_components/CategoriesSection";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col p-4 border-t border-b border-separate">
        <h1 className="text-lg font-semibold">Categories</h1>
        <p className="text-muted-foreground text-md">Manage your categories</p>
      </header>
      <CategoriesSection />
    </div>
  );
}
