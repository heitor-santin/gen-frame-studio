import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Plus,
  Trash2,
  GripVertical,
  PlaySquare,
  Settings,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Educacional", "Entretenimento", "Tecnologia", "Ciência", 
  "História", "Arte", "Esportes", "Culinária", "Viagem", "Negócios"
];

const animationStyles = [
  "Cartoon", "Realista", "Lego", "Colagem"
];

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "planned" | "in-progress" | "completed";
}

export default function CreateSeries() {
  const [seriesTitle, setSeriesTitle] = useState("");
  const [seriesDescription, setSeriesDescription] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: "1",
      title: "",
      description: "",
      duration: "",
      status: "planned"
    }
  ]);

  const addEpisode = () => {
    const newEpisode: Episode = {
      id: (episodes.length + 1).toString(),
      title: "",
      description: "",
      duration: "",
      status: "planned"
    };
    setEpisodes([...episodes, newEpisode]);
  };

  const removeEpisode = (id: string) => {
    if (episodes.length > 1) {
      setEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  const updateEpisode = (id: string, field: keyof Episode, value: string) => {
    setEpisodes(episodes.map(ep => 
      ep.id === id ? { ...ep, [field]: value } : ep
    ));
  };

  const handleCreateSeries = () => {
    // Placeholder for series creation logic
    console.log("Creating series:", {
      title: seriesTitle,
      description: seriesDescription,
      category,
      style,
      episodes
    });
  };

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
              <h1 className="text-3xl font-bold font-display text-foreground">Criar Nova Série</h1>
              <p className="text-muted-foreground mt-1">
                Configure sua série e planeje os episódios
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Series Info */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display">Informações da Série</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Título da Série
                  </label>
                  <Input
                    placeholder="Ex: História da Inteligência Artificial"
                    value={seriesTitle}
                    onChange={(e) => setSeriesTitle(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Descrição
                  </label>
                  <Textarea
                    placeholder="Descreva o que sua série abordará, o público-alvo e os principais temas..."
                    value={seriesDescription}
                    onChange={(e) => setSeriesDescription(e.target.value)}
                    className="min-h-24 bg-background border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Categoria
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Estilo de Animação
                    </label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Escolha o estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        {animationStyles.map((st) => (
                          <SelectItem key={st} value={st}>
                            {st}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Episodes Planning */}
            <Card className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground font-display">Planejamento de Episódios</CardTitle>
                <Button 
                  onClick={addEpisode}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Episódio
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {episodes.map((episode, index) => (
                  <div key={episode.id} className="p-4 border border-border rounded-lg bg-muted/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        <Badge variant="outline" className="text-xs">
                          Episódio {index + 1}
                        </Badge>
                      </div>
                      {episodes.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEpisode(episode.id)}
                          className="w-8 h-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Input
                        placeholder="Título do episódio"
                        value={episode.title}
                        onChange={(e) => updateEpisode(episode.id, "title", e.target.value)}
                        className="bg-background border-border"
                      />
                      <Textarea
                        placeholder="Descrição do episódio..."
                        value={episode.description}
                        onChange={(e) => updateEpisode(episode.id, "description", e.target.value)}
                        className="min-h-20 bg-background border-border"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Duração estimada (ex: 3-5 min)"
                          value={episode.duration}
                          onChange={(e) => updateEpisode(episode.id, "duration", e.target.value)}
                          className="bg-background border-border"
                        />
                        <Select 
                          value={episode.status} 
                          onValueChange={(value) => updateEpisode(episode.id, "status", value)}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="planned">Planejado</SelectItem>
                            <SelectItem value="in-progress">Em Progresso</SelectItem>
                            <SelectItem value="completed">Concluído</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Create Button */}
            <div className="flex justify-center pt-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-12 py-6 rounded-xl shadow-glow"
                onClick={handleCreateSeries}
                disabled={!seriesTitle.trim() || !category || !style}
              >
                Criar Série
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Series Preview */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display text-sm">Preview da Série</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                  <PlaySquare className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {seriesTitle || "Título da Série"}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {seriesDescription || "Descrição da série aparecerá aqui..."}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{episodes.length} episódios</span>
                  <span>{category || "Categoria"}</span>
                </div>
                {style && (
                  <Badge variant="outline" className="text-xs">
                    {style}
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display text-sm flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Publicar automaticamente</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Notificar inscritos</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Série privada</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display text-sm">Dicas para Séries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Planeje entre 4-12 episódios para manter o engajamento</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mantenha consistência visual entre os episódios</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Crie um gancho entre episódios para continuidade</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}