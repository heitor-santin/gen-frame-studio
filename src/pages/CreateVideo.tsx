import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Play, 
  Pause, 
  ArrowLeft,
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";

import cartoonStyle from "@/assets/cartoon-style.jpg";
import realisticStyle from "@/assets/realistic-style.jpg";
import legoStyle from "@/assets/lego-style.jpg";
import collageStyle from "@/assets/collage-style.jpg";

const animationStyles = [
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Estilo animado e colorido",
    preview: cartoonStyle
  },
  {
    id: "realistic", 
    name: "Realista",
    description: "Visual cinematográfico",
    preview: realisticStyle
  },
  {
    id: "lego",
    name: "Lego",
    description: "Blocos de construção",
    preview: legoStyle 
  },
  {
    id: "collage",
    name: "Colagem",
    description: "Recortes e texturas",
    preview: collageStyle
  }
];

const trendingMusic = [
  { id: 1, name: "Epic Journey", tag: "Épico", duration: "2:34", playing: false },
  { id: 2, name: "Motivational Beat", tag: "Motivacional", duration: "1:58", playing: false },
  { id: 3, name: "Calm Waves", tag: "Calmo", duration: "3:12", playing: false },
  { id: 4, name: "Tech Future", tag: "Futurista", duration: "2:45", playing: false },
  { id: 5, name: "Ambient Dreams", tag: "Ambiente", duration: "4:01", playing: false },
  { id: 6, name: "Upbeat Energy", tag: "Energético", duration: "2:15", playing: false }
];

export default function CreateVideo() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cartoon");
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [playingMusic, setPlayingMusic] = useState<number | null>(null);

  const handleImprovePrompt = () => {
    // Placeholder for AI prompt improvement
    setPrompt(prev => prev + " [Melhorado com IA]");
  };

  const handleGenerateVideo = () => {
    // Placeholder for video generation
    console.log("Generating video with:", { prompt, selectedStyle, selectedMusic });
  };

  const toggleMusic = (musicId: number) => {
    setPlayingMusic(playingMusic === musicId ? null : musicId);
  };

  const characterCount = prompt.length;
  const maxCharacters = 1200;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <div>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground">Criar Novo Vídeo</h1>
              <p className="text-muted-foreground mt-1">
                Descreva sua ideia e deixe a IA criar um vídeo incrível
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Creation Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display">Descreva seu vídeo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Descreva o vídeo que você deseja criar... Ex: Uma história sobre um robô que descobre a amizade em uma cidade futurista"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 text-foreground bg-input border-border resize-none"
                    maxLength={maxCharacters}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {characterCount}/{maxCharacters}
                  </div>
                </div>
                <Button 
                  onClick={handleImprovePrompt}
                  variant="outline"
                  className="w-full"
                  disabled={!prompt.trim()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Melhorar Prompt com IA
                </Button>
              </CardContent>
            </Card>

            {/* Animation Style Selection */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display">Estilo de Animação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {animationStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedStyle === style.id
                          ? "border-primary shadow-glow"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <div className="aspect-video bg-muted/30 rounded-t-md flex items-center justify-center overflow-hidden">
                        <img 
                          src={style.preview} 
                          alt={style.name}
                          className="w-full h-full object-cover rounded-t-md"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-foreground text-sm">{style.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                      </div>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-12 py-6 rounded-xl shadow-glow"
                onClick={handleGenerateVideo}
                disabled={!prompt.trim()}
              >
                Gerar Vídeo
              </Button>
            </div>
          </div>

          {/* Sidebar - Trending Music */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display">Músicas em Alta</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Escolha a trilha sonora perfeita
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingMusic.map((track) => (
                  <div
                    key={track.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedMusic === track.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-muted/20"
                    }`}
                    onClick={() => setSelectedMusic(selectedMusic === track.id ? null : track.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {track.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                          >
                            {track.tag}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {track.duration}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMusic(track.id);
                          }}
                        >
                          {playingMusic === track.id ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                        </Button>
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display text-sm">Dicas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Seja específico sobre personagens, cenários e ações</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mencione o tom desejado: dramático, engraçado, inspirador</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use referências visuais conhecidas para melhor resultado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}