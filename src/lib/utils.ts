import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function that combines multiple CSS class names and merges Tailwind CSS classes.
 * Uses clsx to conditionally join class names and twMerge to properly merge Tailwind utilities.
 * @param inputs - Array of class names, objects, or arrays to be combined
 * @returns A single string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string to locale-specific format with timezone conversion
 * @param dateString - ISO date string
 * @param language - Language code ('en', 'de', 'ro')
 * @returns Formatted date string
 */
export function formatDate(dateString?: string, language: 'en' | 'de' | 'ro' = 'de'): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const locale = language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB';
    const timeZone = language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London';
    
    return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: timeZone
    });
} 

/**
 * Format a date string to locale-specific time format with timezone conversion
 * @param dateString - ISO date string
 * @param language - Language code ('en', 'de', 'ro')
 * @returns Formatted time string
 */
export function formatTime(dateString?: string, language: 'en' | 'de' | 'ro' = 'de'): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const locale = language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB';
    const timeZone = language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London';
    
    return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone
    });
}

/**
 * Route to the base page based on user groups
 * @param groups - Array of user groups
 * @returns Base page route
 */
export function routeToBasePage(groups: string[]): string {
    if (groups.includes('admin')) {
        return '/admin/panel';
    } else if (groups.includes('doctor')) {
        return '/doctor/panel';
    } else if (groups.includes('patient')) {
        return '/user/profile';
    }
    return '/user/profile';
}