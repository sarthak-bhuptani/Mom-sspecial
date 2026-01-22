import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Save, Lock, LogOut } from "lucide-react";
import { motion } from "framer-motion";

import { API_URL } from "@/config";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [menuData, setMenuData] = useState<any>(null);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        setMenuData(null);
        toast.info("Logged out");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL.replace('/menu', '')}/verify`, { // Hack to get base URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                fetchMenu();
            } else {
                toast.error("Invalid Password");
            }
        } catch (error) {
            toast.error("Connection failed. Ensure backend is running.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMenu = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setMenuData(data);
        } catch (error) {
            toast.error("Failed to fetch menu data. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: password, // Send password to verify on backend
                    lunch: menuData.lunch,
                    dinner: menuData.dinner,
                    optional: menuData.optional
                }),
            });

            if (res.ok) {
                toast.success("Menu updated successfully!");
            } else {
                toast.error("Failed to update menu");
            }
        } catch (error) {
            toast.error("Error saving data");
        } finally {
            setIsLoading(false);
        }
    };

    const updateLunch = (index: number, field: string, value: string) => {
        const newLunch = [...menuData.lunch];
        newLunch[index] = { ...newLunch[index], [field]: value };
        setMenuData({ ...menuData, lunch: newLunch });
    };

    const updateDinner = (index: number, field: string, value: string) => {
        const newDinner = [...menuData.dinner];
        newDinner[index] = { ...newDinner[index], [field]: value };
        setMenuData({ ...menuData, dinner: newDinner });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border border-border"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-primary/10 rounded-full text-primary">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-lg py-6"
                        />
                        <Button type="submit" className="w-full text-lg py-6" disabled={!password}>
                            Login to Dashboard
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    if (!menuData) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="min-h-screen bg-muted/10 pb-40 pt-20 md:pt-24">
            <header className="bg-card border-b border-border sticky top-16 md:top-20 z-40 px-4 py-4 shadow-sm transition-all">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">🍱 Menu Manager</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive gap-2">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
                {/* Lunch Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6 bg-primary/10 p-4 rounded-xl inline-block">
                        <span className="text-3xl">🥗</span>
                        <h2 className="text-2xl font-bold text-primary">Lunch Menu</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuData.lunch && Array.isArray(menuData.lunch) && menuData.lunch.map((item: any, index: number) => (
                            <div key={index} className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="font-bold text-lg mb-4 text-foreground border-b border-border pb-2 flex justify-between items-center">
                                    {item.day}
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Lunch</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Sabji</label>
                                        <Input
                                            value={item.sabji}
                                            onChange={(e) => updateLunch(index, 'sabji', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Dal</label>
                                        <Input
                                            value={item.dal}
                                            onChange={(e) => updateLunch(index, 'dal', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase text-muted-foreground">Roti</label>
                                            <Input
                                                value={item.roti}
                                                onChange={(e) => updateLunch(index, 'roti', e.target.value)}
                                                className="h-9"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase text-muted-foreground">Rice</label>
                                            <Input
                                                value={item.rice}
                                                onChange={(e) => updateLunch(index, 'rice', e.target.value)}
                                                className="h-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Dinner Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6 bg-secondary/10 p-4 rounded-xl inline-block">
                        <span className="text-3xl">🍽️</span>
                        <h2 className="text-2xl font-bold text-secondary">Dinner Menu</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuData.dinner && Array.isArray(menuData.dinner) && menuData.dinner.map((item: any, index: number) => (
                            <div key={index} className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="font-bold text-lg mb-4 text-foreground border-b border-border pb-2 flex justify-between items-center">
                                    {item.day}
                                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">Dinner</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Sabji</label>
                                        <Input
                                            value={item.sabji}
                                            onChange={(e) => updateDinner(index, 'sabji', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Roti</label>
                                        <Input
                                            value={item.roti}
                                            onChange={(e) => updateDinner(index, 'roti', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admin;
