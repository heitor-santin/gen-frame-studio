import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play,
  Edit,
  Users,
  Eye,
  Video
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function SeriesDetail() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/series">
                <div>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground">
                História da Tecnologia
              </h1>
              <p className="text-muted-foreground mt-1">
                Série ID: {id}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-display">Detalhes da Série</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/20 border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Episódios</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/20 border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
                      <p className="text-2xl font-bold text-foreground">45.2k</p>
                    </div>
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/20 border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Inscritos</p>
                      <p className="text-2xl font-bold text-foreground">1.250</p>
                    </div>
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Episódios</h3>
              
              {[1, 2, 3].map((ep) => (
                <div key={ep} className="p-4 border border-border rounded-lg bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Episódio {ep}</h4>
                      <p className="text-sm text-muted-foreground">Descrição do episódio {ep}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {ep <= 2 ? "Concluído" : "Em Produção"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Assistir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to={`/series/${id}/edit`}>
                  <div className="flex items-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Série
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}