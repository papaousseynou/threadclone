import { getAuthSession } from "@/lib/auth";
import ThemeToggle from "@/src/theme/ThemeToggle";
import LoginButton from "./auth/LoginButton";
import UserProfile from "./auth/UserProfile";

export default async function Header() {
  const session = await getAuthSession();
  return (
    <header className="border-b border-b-accent fixed top-0 left-0 right-0 bg-background">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <h1 className="text-2xl font-bold mr-auto">Githread</h1>
        {session?.user.id ? <UserProfile /> : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
}
