import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  CreditCard,
  Calendar,
  TrendingUp,
  Settings,
  Crown,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface UserCredits {
  credits_available: number;
  credits_used: number;
  credits_total: number;
  last_reset_date: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  credits_per_month: number;
  price_monthly: number;
  features: string[] | any;
}

interface UserSubscription {
  status: string;
  current_period_start: string;
  current_period_end: string;
  subscription_plans: SubscriptionPlan;
}

export default function Account() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para acessar esta página.",
          variant: "destructive",
        });
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch credits
      const { data: creditsData } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch subscription with plan details
      const { data: subscriptionData } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      setProfile(profileData);
      setCredits(creditsData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error('Error fetching account data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as informações da conta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", variant: "default" as const },
      cancelled: { label: "Cancelado", variant: "secondary" as const },
      expired: { label: "Expirado", variant: "destructive" as const },
      pending: { label: "Pendente", variant: "outline" as const },
    };
    
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "outline" as const };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const creditsUsagePercentage = credits 
    ? (credits.credits_used / credits.credits_total) * 100 
    : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-display text-foreground">Minha Conta</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted animate-pulse rounded mb-4" />
                  <div className="h-8 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Minha Conta</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações, créditos e assinatura
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">
                  {profile?.display_name || 'Usuário'}
                </h3>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Credits Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Créditos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {credits?.credits_available || 0}
                </div>
                <p className="text-sm text-muted-foreground">créditos disponíveis</p>
              </div>

              <Progress 
                value={creditsUsagePercentage} 
                className="w-full"
              />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Usados: {credits?.credits_used || 0}</span>
                <span>Total: {credits?.credits_total || 0}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Último reset:</span>
                <span className="text-foreground">
                  {credits?.last_reset_date ? formatDate(credits.last_reset_date) : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Plano Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {subscription.subscription_plans.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {subscription.subscription_plans.description}
                      </p>
                    </div>
                    <Badge variant={getStatusBadge(subscription.status).variant}>
                      {getStatusBadge(subscription.status).label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Créditos mensais:</span>
                      <span className="text-foreground">
                        {subscription.subscription_plans.credits_per_month}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preço mensal:</span>
                      <span className="text-foreground">
                        R$ {subscription.subscription_plans.price_monthly.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Período atual:</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(subscription.current_period_start)} até{' '}
                      {formatDate(subscription.current_period_end)}
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Gerenciar Assinatura
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Plano Gratuito</h3>
                    <p className="text-sm text-muted-foreground">
                      Você está usando o plano gratuito
                    </p>
                  </div>
                  <Button className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Fazer Upgrade
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage History */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Histórico de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Histórico de uso será exibido aqui</p>
              <p className="text-sm">Comece criando seus primeiros vídeos!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}