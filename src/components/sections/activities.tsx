'use client';
import { useState } from 'react';
import { Zap, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Activity } from '@/lib/definitions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ActivitiesProps = {
  activities?: Activity[];
};

export default function Activities({ activities: initialActivities = [] }: ActivitiesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const visibleActivities = initialActivities.filter((a) => a.isVisible !== false);
  const previewActivities = visibleActivities.slice(0, 2);

  const totalPages = Math.ceil(visibleActivities.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = visibleActivities.slice(startIndex, startIndex + itemsPerPage);

  const renderIcon = (iconName: string, size = 14) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Zap;
    return <IconComponent size={size} />;
  };

  return (
    <>
      {/* Home Preview Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="bento-card flex flex-col relative overflow-hidden h-auto cursor-pointer group hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <div className="flex flex-col p-5 pb-6 z-20">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-0.5">
              <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black">
                Leadership
              </span>
              <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">
                Activities
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-code font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors bg-muted/40 group-hover:bg-primary/10 px-2 py-1 rounded-lg border border-border/50 group-hover:border-primary/20">
              <span>View All</span>
              <Maximize2 size={10} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="flex flex-col gap-3.5 relative">
            {previewActivities.length > 0 ? (
              previewActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3 group/item items-start">
                  <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 text-muted-foreground border border-border group-hover/item:text-primary group-hover/item:border-primary/30 transition-colors">
                    {renderIcon(activity.icon, 13)}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider leading-tight truncate">
                      {activity.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed font-medium line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-muted-foreground italic">No activities listed.</p>
            )}
          </div>
        </div>
      </div>

      {/* Paginated Popup Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl bg-card/95 backdrop-blur-2xl border-border/80 p-6 rounded-2xl shadow-2xl space-y-4">
          <DialogHeader className="space-y-1.5 text-left border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Zap size={16} />
              </div>
              <div>
                <DialogTitle className="text-base font-black uppercase tracking-tight text-foreground">
                  Leadership & Activities
                </DialogTitle>
                <DialogDescription className="text-[11px] text-muted-foreground font-medium">
                  Hackathons, community leadership, and technical initiatives ({visibleActivities.length} total)
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Paginated Activity Items */}
          <div className="flex flex-col gap-3 min-h-[220px]">
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="p-4 rounded-xl bg-background/50 border border-border/60 hover:border-primary/30 transition-all flex gap-4 items-start group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                    {renderIcon(activity.icon, 16)}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-[12px] font-black text-foreground uppercase tracking-wide">
                        {activity.title}
                      </h4>
                      <span className="text-[9px] font-code text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                        #{startIndex + index + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-xs italic">
                No activities available.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider border-border/70"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={13} className="mr-1" /> Previous
              </Button>

              <span className="text-[10px] font-code font-black text-muted-foreground uppercase tracking-[0.2em]">
                Page {currentPage} <span className="text-primary/50">/</span> {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider border-border/70"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={13} className="ml-1" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
