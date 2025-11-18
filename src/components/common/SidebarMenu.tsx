'use client'

import React from 'react';

// Define the menu item interface
export interface MenuItem {
  id: string;
  label: string;
  icon?: string; // You can add icons if needed
}

interface SidebarMenuProps {
  title: string;
  subtitle: string;
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  subtitle,
  menuItems,
  activeSection,
  onSectionChange,
  children
}) => {

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="w-64 min-h-screen shadow-lg border-r border-border-primary">
          <div className="p-6 border-b border-border-primary mt-4">
            <h1 className="text-xl font-bold text-foreground-primary">
              {title}
            </h1>
            <p className="text-sm text-foreground-secondary mt-1">
              {subtitle}
            </p>
          </div>
          <nav className="mt-4">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600'
                        : 'text-foreground-secondary hover:bg-background-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content - Desktop */}
        <div className="flex-1 bg-background-primary shadow-lg m-8 rounded-xl border border-border-primary">
          {children}
        </div>
      </div>

      {/* Mobile Content - Simplified layout without navigation */}
      <div className="md:hidden">
        <div className="bg-background-primary mx-4 my-4 rounded-lg shadow-sm border border-border-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
