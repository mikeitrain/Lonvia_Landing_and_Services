import React from "react";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";
import { Footer2 } from "@/components/ui/footer2";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background-primary w-full relative overflow-x-hidden">
            <NavigationBar />
            <main className="flex-1 overflow-x-hidden pt-36">
                {children}
            </main>
            <Footer2 />
        </div>
    );
}; 