'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { HomeCard, HomeCardSkill } from '@/lib/definitions';
import { Plus, Trash, ArrowUp, ArrowDown, Sparkles, LayoutGrid } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SUGGESTED_ICONS = [
  'Code2',
  'Cpu',
  'Layers',
  'Terminal',
  'Database',
  'Sparkles',
  'Globe',
  'Cloud',
  'Server',
  'Zap',
  'Boxes',
  'Wrench',
  'Shield',
  'Workflow',
  'Flame',
  'Laptop',
];

export default function HomeCardsForm({ homeCards: initialCards }: { homeCards: HomeCard[] }) {
  const [cards, setCards] = useState<HomeCard[]>(
    initialCards && initialCards.length > 0
      ? initialCards
      : [
          {
            id: '1',
            title: 'Web Stack',
            icon: 'Code2',
            isVisible: true,
            skills: [
              { name: 'React', isVisible: true },
              { name: 'Next.js', isVisible: true },
              { name: 'TypeScript', isVisible: true },
              { name: 'JavaScript', isVisible: true },
              { name: 'Tailwind CSS', isVisible: true },
              { name: 'HTML/CSS', isVisible: true },
            ],
          },
          {
            id: '2',
            title: 'Systems & AI',
            icon: 'Cpu',
            isVisible: true,
            skills: [
              { name: 'Python', isVisible: true },
              { name: 'Django', isVisible: true },
              { name: 'Firebase', isVisible: true },
              { name: 'Gemini', isVisible: true },
              { name: 'Ollama', isVisible: true },
              { name: 'AI-assisted Development', isVisible: true },
            ],
          },
        ]
  );

  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddCard = () => {
    const newCard: HomeCard = {
      id: `card-${Date.now()}`,
      title: 'New Capability',
      icon: 'Layers',
      isVisible: true,
      skills: [
        { name: 'Item 1', isVisible: true },
        { name: 'Item 2', isVisible: true },
      ],
    };
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (cardIndex: number) => {
    setCards(cards.filter((_, i) => i !== cardIndex));
  };

  const handleCardChange = (cardIndex: number, field: keyof HomeCard, value: any) => {
    const newCards = [...cards];
    newCards[cardIndex] = { ...newCards[cardIndex], [field]: value };
    setCards(newCards);
  };

  const handleMoveCardUp = (cardIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (cardIndex <= 0) return;
    const newCards = [...cards];
    const temp = newCards[cardIndex - 1];
    newCards[cardIndex - 1] = newCards[cardIndex];
    newCards[cardIndex] = temp;
    setCards(newCards);
  };

  const handleMoveCardDown = (cardIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (cardIndex >= cards.length - 1) return;
    const newCards = [...cards];
    const temp = newCards[cardIndex + 1];
    newCards[cardIndex + 1] = newCards[cardIndex];
    newCards[cardIndex] = temp;
    setCards(newCards);
  };

  const handleSkillChange = (
    cardIndex: number,
    skillIndex: number,
    field: keyof HomeCardSkill,
    value: string | boolean
  ) => {
    const newCards = [...cards];
    const targetSkill = { ...newCards[cardIndex].skills[skillIndex], [field]: value };
    newCards[cardIndex].skills[skillIndex] = targetSkill;
    setCards(newCards);
  };

  const handleAddSkill = (cardIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].skills.push({ name: 'New Skill', isVisible: true });
    setCards(newCards);
  };

  const handleRemoveSkill = (cardIndex: number, skillIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].skills.splice(skillIndex, 1);
    setCards(newCards);
  };

  const handleSave = async () => {
    const cardsWithIds = cards.map((c, index) => ({
      ...c,
      id: c.id.startsWith('card-') ? `${index + 1}` : c.id,
    }));

    try {
      const response = await fetch('/api/data?file=home-cards.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardsWithIds),
      });
      if (!response.ok) throw new Error('Failed to save home cards.');
      toast({ title: 'Success', description: 'Home cards saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save home cards. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Incorrect password.');
      }

      const { success } = await response.json();
      if (success) {
        setIsPasswordDialogOpen(false);
        await handleSave();
      } else {
        throw new Error('Incorrect password.');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Password verification failed.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between pb-2">
          <div>
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Homepage Capability Cards ({cards.length})
            </Label>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              These cards appear in the top row next to your Identity profile card on the homepage.
            </p>
          </div>
        </div>

        <Accordion type="multiple" className="space-y-4">
          {cards.map((card, cardIndex) => {
            const IconComponent = (LucideIcons as any)[card.icon] || LucideIcons.Sparkles;

            return (
              <AccordionItem
                key={card.id || `card-${cardIndex}`}
                value={`card-${cardIndex}`}
                className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4"
              >
                <div className="flex items-center justify-between py-2">
                  <AccordionTrigger className="hover:no-underline py-2 flex-1">
                    <div className="flex items-center gap-3 text-left min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <IconComponent size={15} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black uppercase tracking-wider text-foreground truncate">
                          {card.title || `Card ${cardIndex + 1}`}
                        </h3>
                        <div className="text-[10px] text-muted-foreground font-code uppercase tracking-widest flex items-center gap-2 mt-0.5">
                          <span className="bg-muted px-1.5 py-0.5 rounded text-[9px] font-bold text-foreground">
                            Slot #{cardIndex + 1}
                          </span>
                          <span>{card.isVisible !== false ? '// Visible' : '// Hidden'}</span>
                          <span>• {card.skills.length} Items</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <div className="flex items-center gap-1 pl-2 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                      disabled={cardIndex === 0}
                      onClick={(e) => handleMoveCardUp(cardIndex, e)}
                      title="Move Up"
                    >
                      <ArrowUp size={13} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                      disabled={cardIndex === cards.length - 1}
                      onClick={(e) => handleMoveCardDown(cardIndex, e)}
                      title="Move Down"
                    >
                      <ArrowDown size={13} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <Switch
                        id={`card-visible-${cardIndex}`}
                        checked={card.isVisible !== false}
                        onCheckedChange={(checked) =>
                          handleCardChange(cardIndex, 'isVisible', checked)
                        }
                      />
                      <Label
                        htmlFor={`card-visible-${cardIndex}`}
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Visibility Status
                      </Label>
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                      onClick={() => handleRemoveCard(cardIndex)}
                    >
                      <Trash className="h-3 w-3 mr-2" /> Delete Card
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Card Title
                      </Label>
                      <Input
                        className="bg-background/50 rounded-xl h-10"
                        value={card.title}
                        onChange={(e) => handleCardChange(cardIndex, 'title', e.target.value)}
                        placeholder="e.g. Web Stack, Systems & AI"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center justify-between">
                        <span>Lucide Icon Name</span>
                        <span className="text-[9px] font-normal text-muted-foreground">e.g. Code2, Cpu, Sparkles</span>
                      </Label>
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                          <IconComponent size={16} />
                        </div>
                        <Input
                          className="bg-background/50 rounded-xl h-10"
                          value={card.icon}
                          onChange={(e) => handleCardChange(cardIndex, 'icon', e.target.value)}
                          placeholder="Icon Name (e.g. Code2)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Suggested Icon Chips */}
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      Suggested Icons:
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_ICONS.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => handleCardChange(cardIndex, 'icon', iconName)}
                          className={`text-[9px] font-code px-2 py-1 rounded-md border transition-all ${
                            card.icon === iconName
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/40 hover:bg-muted text-muted-foreground border-border/50'
                          }`}
                        >
                          {iconName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills / Items List */}
                  <div className="space-y-4 pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                          Card Items / Skills
                        </Label>
                        <p className="text-[9px] text-muted-foreground">
                          Displayed in the two-column grid on the card
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-lg text-[9px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5"
                        onClick={() => handleAddSkill(cardIndex)}
                      >
                        <Plus className="mr-1.5 h-3 w-3" /> Add Item
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {card.skills.map((skill, skillIndex) => (
                        <div
                          key={`card-${cardIndex}-skill-${skillIndex}`}
                          className="p-3 rounded-xl bg-background/50 border border-border/50 space-y-3 group hover:border-primary/20 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`skill-vis-${cardIndex}-${skillIndex}`}
                                checked={skill.isVisible !== false}
                                onCheckedChange={(checked) =>
                                  handleSkillChange(cardIndex, skillIndex, 'isVisible', checked)
                                }
                              />
                              <Label
                                htmlFor={`skill-vis-${cardIndex}-${skillIndex}`}
                                className="text-[9px] font-black uppercase tracking-widest text-muted-foreground"
                              >
                                Active
                              </Label>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveSkill(cardIndex, skillIndex)}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                          <Input
                            className="bg-background border-border/50 h-8 text-xs rounded-lg"
                            value={skill.name}
                            onChange={(e) =>
                              handleSkillChange(cardIndex, skillIndex, 'name', e.target.value)
                            }
                            placeholder="Skill / Item name"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCard}
            className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]"
          >
            <Plus className="mr-2 h-4 w-4" /> New Capability Card
          </Button>
          <Button
            type="submit"
            className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
          >
            Sync Changes
          </Button>
        </div>
      </form>
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onConfirm={handlePasswordConfirm}
        isVerifying={isVerifying}
      />
    </>
  );
}
