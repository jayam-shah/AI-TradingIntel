import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { Plus, Trash2, Bell, TrendingUp, TrendingDown, MoreVertical, Search, AlertTriangle, Clock, Target, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PriceAlert {
  id: number;
  symbol: string;
  alertType: 'above' | 'below' | 'change_percent';
  targetPrice?: string;
  changePercent?: string;
  isActive: boolean;
  triggered: boolean;
  triggeredAt?: string;
  createdAt: string;
}

interface NewsAlert {
  id: number;
  symbol: string;
  keywords: string[];
  isActive: boolean;
  createdAt: string;
}

interface AlertNotification {
  id: number;
  alertType: 'price' | 'news';
  symbol: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AlertManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('price');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Form states for creating alerts
  const [priceAlertForm, setPriceAlertForm] = useState({
    symbol: '',
    alertType: 'above' as 'above' | 'below' | 'change_percent',
    targetPrice: '',
    changePercent: ''
  });

  const [newsAlertForm, setNewsAlertForm] = useState({
    symbol: '',
    keywords: ['']
  });

  // Fetch price alerts
  const { data: priceAlerts, isLoading: priceLoading } = useQuery({
    queryKey: ['/api/alerts/price'],
    retry: false,
  });

  // Fetch news alerts
  const { data: newsAlerts, isLoading: newsLoading } = useQuery({
    queryKey: ['/api/alerts/news'],
    retry: false,
  });

  // Fetch notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ['/api/alerts/notifications'],
    retry: false,
  });

  // Fetch alert statistics
  const { data: alertStats } = useQuery({
    queryKey: ['/api/alerts/stats'],
    retry: false,
  });

  // Create price alert mutation
  const createPriceAlertMutation = useMutation({
    mutationFn: async (alertData: any) => {
      await apiRequest('/api/alerts/price', { method: 'POST', body: JSON.stringify(alertData) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/price'] });
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/stats'] });
      setIsCreateDialogOpen(false);
      setPriceAlertForm({ symbol: '', alertType: 'above', targetPrice: '', changePercent: '' });
      toast({
        title: "Alert Created",
        description: "Your price alert has been created successfully.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create price alert.",
        variant: "destructive",
      });
    },
  });

  // Create news alert mutation
  const createNewsAlertMutation = useMutation({
    mutationFn: async (alertData: any) => {
      await apiRequest('/api/alerts/news', { method: 'POST', body: JSON.stringify(alertData) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/news'] });
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/stats'] });
      setIsCreateDialogOpen(false);
      setNewsAlertForm({ symbol: '', keywords: [''] });
      toast({
        title: "Alert Created",
        description: "Your news alert has been created successfully.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create news alert.",
        variant: "destructive",
      });
    },
  });

  // Delete price alert mutation
  const deletePriceAlertMutation = useMutation({
    mutationFn: async (alertId: number) => {
      await apiRequest(`/api/alerts/price/${alertId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/price'] });
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/stats'] });
      toast({
        title: "Alert Deleted",
        description: "Your price alert has been deleted.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      });
    },
  });

  // Delete news alert mutation
  const deleteNewsAlertMutation = useMutation({
    mutationFn: async (alertId: number) => {
      await apiRequest(`/api/alerts/news/${alertId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/news'] });
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/stats'] });
      toast({
        title: "Alert Deleted",
        description: "Your news alert has been deleted.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      });
    },
  });

  // Mark notification as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      await apiRequest(`/api/alerts/notifications/${notificationId}/read`, { method: 'POST' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts/notifications'] });
    },
  });

  const handleCreatePriceAlert = () => {
    if (!priceAlertForm.symbol) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol.",
        variant: "destructive",
      });
      return;
    }

    if (priceAlertForm.alertType === 'change_percent' && !priceAlertForm.changePercent) {
      toast({
        title: "Error",
        description: "Please enter a percentage change.",
        variant: "destructive",
      });
      return;
    }

    if ((priceAlertForm.alertType === 'above' || priceAlertForm.alertType === 'below') && !priceAlertForm.targetPrice) {
      toast({
        title: "Error",
        description: "Please enter a target price.",
        variant: "destructive",
      });
      return;
    }

    createPriceAlertMutation.mutate({
      symbol: priceAlertForm.symbol.toUpperCase(),
      alertType: priceAlertForm.alertType,
      targetPrice: priceAlertForm.alertType !== 'change_percent' ? priceAlertForm.targetPrice : undefined,
      changePercent: priceAlertForm.alertType === 'change_percent' ? priceAlertForm.changePercent : undefined,
    });
  };

  const handleCreateNewsAlert = () => {
    if (!newsAlertForm.symbol) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol.",
        variant: "destructive",
      });
      return;
    }

    const keywords = newsAlertForm.keywords.filter(keyword => keyword.trim() !== '');
    if (keywords.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one keyword.",
        variant: "destructive",
      });
      return;
    }

    createNewsAlertMutation.mutate({
      symbol: newsAlertForm.symbol.toUpperCase(),
      keywords,
    });
  };

  const addKeywordField = () => {
    setNewsAlertForm(prev => ({
      ...prev,
      keywords: [...prev.keywords, '']
    }));
  };

  const updateKeyword = (index: number, value: string) => {
    setNewsAlertForm(prev => ({
      ...prev,
      keywords: prev.keywords.map((keyword, i) => i === index ? value : keyword)
    }));
  };

  const removeKeyword = (index: number) => {
    setNewsAlertForm(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      {alertStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{alertStats.totalActive || 0}</div>
                  <div className="text-xs text-gray-400">Active Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{alertStats.totalTriggered || 0}</div>
                  <div className="text-xs text-gray-400">Triggered</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{alertStats.priceAlerts || 0}</div>
                  <div className="text-xs text-gray-400">Price Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{alertStats.newsAlerts || 0}</div>
                  <div className="text-xs text-gray-400">News Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="price" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Price Alerts
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              News Alerts
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Notifications
            </TabsTrigger>
          </TabsList>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Set up a new price or news alert for your portfolio.
                </DialogDescription>
              </DialogHeader>

              <Tabs value={activeTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="price" onClick={() => setActiveTab('price')}>Price Alert</TabsTrigger>
                  <TabsTrigger value="news" onClick={() => setActiveTab('news')}>News Alert</TabsTrigger>
                </TabsList>

                <TabsContent value="price" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Stock Symbol</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g., AAPL"
                      value={priceAlertForm.symbol}
                      onChange={(e) => setPriceAlertForm(prev => ({ ...prev, symbol: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alertType">Alert Type</Label>
                    <Select value={priceAlertForm.alertType} onValueChange={(value: any) => setPriceAlertForm(prev => ({ ...prev, alertType: value }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Price Above</SelectItem>
                        <SelectItem value="below">Price Below</SelectItem>
                        <SelectItem value="change_percent">% Change</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(priceAlertForm.alertType === 'above' || priceAlertForm.alertType === 'below') && (
                    <div className="space-y-2">
                      <Label htmlFor="targetPrice">Target Price ($)</Label>
                      <Input
                        id="targetPrice"
                        type="number"
                        placeholder="0.00"
                        value={priceAlertForm.targetPrice}
                        onChange={(e) => setPriceAlertForm(prev => ({ ...prev, targetPrice: e.target.value }))}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  )}

                  {priceAlertForm.alertType === 'change_percent' && (
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change Percentage (%)</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        placeholder="5"
                        value={priceAlertForm.changePercent}
                        onChange={(e) => setPriceAlertForm(prev => ({ ...prev, changePercent: e.target.value }))}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleCreatePriceAlert}
                    disabled={createPriceAlertMutation.isPending}
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                  >
                    {createPriceAlertMutation.isPending ? 'Creating...' : 'Create Price Alert'}
                  </Button>
                </TabsContent>

                <TabsContent value="news" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="newsSymbol">Stock Symbol</Label>
                    <Input
                      id="newsSymbol"
                      placeholder="e.g., AAPL"
                      value={newsAlertForm.symbol}
                      onChange={(e) => setNewsAlertForm(prev => ({ ...prev, symbol: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Keywords</Label>
                    {newsAlertForm.keywords.map((keyword, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="e.g., earnings, acquisition"
                          value={keyword}
                          onChange={(e) => updateKeyword(index, e.target.value)}
                          className="bg-gray-800 border-gray-600"
                        />
                        {newsAlertForm.keywords.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeKeyword(index)}
                            className="border-gray-600 hover:bg-gray-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addKeywordField}
                      className="w-full border-gray-600 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Keyword
                    </Button>
                  </div>

                  <Button 
                    onClick={handleCreateNewsAlert}
                    disabled={createNewsAlertMutation.isPending}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    {createNewsAlertMutation.isPending ? 'Creating...' : 'Create News Alert'}
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="price" className="space-y-4">
          {priceLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : priceAlerts && priceAlerts.length > 0 ? (
            <div className="grid gap-4">
              {priceAlerts.map((alert: PriceAlert) => (
                <Card key={alert.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{alert.symbol}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{alert.symbol} Price Alert</h3>
                          <p className="text-sm text-gray-400">
                            {alert.alertType === 'above' && `Alert when price goes above $${alert.targetPrice}`}
                            {alert.alertType === 'below' && `Alert when price goes below $${alert.targetPrice}`}
                            {alert.alertType === 'change_percent' && `Alert when price changes by ${alert.changePercent}%`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {alert.triggered && (
                          <Badge variant="destructive">Triggered</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePriceAlertMutation.mutate(alert.id)}
                          disabled={deletePriceAlertMutation.isPending}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Target className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Price Alerts</h3>
                <p className="text-gray-400 text-center">
                  Create your first price alert to get notified when stocks hit your target prices.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          {newsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : newsAlerts && newsAlerts.length > 0 ? (
            <div className="grid gap-4">
              {newsAlerts.map((alert: NewsAlert) => (
                <Card key={alert.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{alert.symbol}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{alert.symbol} News Alert</h3>
                          <p className="text-sm text-gray-400">
                            Keywords: {alert.keywords.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNewsAlertMutation.mutate(alert.id)}
                          disabled={deleteNewsAlertMutation.isPending}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Newspaper className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No News Alerts</h3>
                <p className="text-gray-400 text-center">
                  Create your first news alert to get notified about important developments.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {notificationsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : notifications && notifications.length > 0 ? (
            <div className="grid gap-4">
              {notifications.map((notification: AlertNotification) => (
                <Card key={notification.id} className={`border-gray-700 ${notification.isRead ? 'bg-gray-800/30' : 'bg-gray-800/50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mt-1">
                          {notification.alertType === 'price' ? (
                            <TrendingUp className="w-4 h-4 text-white" />
                          ) : (
                            <Newspaper className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${notification.isRead ? 'text-gray-400' : 'text-white'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-300'} mt-1`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsReadMutation.mutate(notification.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Bell className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Notifications</h3>
                <p className="text-gray-400 text-center">
                  You'll see notifications here when your alerts are triggered.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}