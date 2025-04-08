
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Moon, Sun } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-nu-blue" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how the application looks and feels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>Dark Mode</span>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-nu-blue" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-nu-blue hover:bg-nu-darkblue">Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
