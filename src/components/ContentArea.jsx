import { useT, mono } from '../theme';
import ImageCarousel from './ImageCarousel';
import BentoGrid from './BentoGrid';
import VideoBlock from './VideoBlock';
import ProjectOverview from './ProjectOverview';
import QuestionsContent from '../slides/QuestionsContent';
import EndContent from '../slides/EndContent';
import ThemeToggle from './ThemeToggle';
import NavDots from './NavDots';
import ArrBtn from './ArrBtn';

function LogoBadge() {
  const t = useT();
  return (
    <div style={{
      width: 27, height: 27, borderRadius: '50%',
      background: t.surfaceInner,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: '-0.02em' }}>
        PD
      </span>
    </div>
  );
}

function SlideWrapper({ vis, dir, children }) {
  const xOff = dir > 0 ? 80 : -80;
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateX(0)' : `translateX(${xOff}px)`,
      transition: `opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${vis ? '460ms' : '0ms'}, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${vis ? '460ms' : '0ms'}`,
      pointerEvents: vis ? 'auto' : 'none',
      zIndex: vis ? 1 : 0,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}

export default function ContentArea({ slides, cur, dir, onRestart, onJump, navProps, sidebarW = 420 }) {
  const t = useT();
  const isOverview = slides[cur]?.content === 'overview';
  const { cur: slideCur, total, labels, onNav, onPrev, onNext, mode, onToggle } = navProps || {};

  const chrome = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 17,
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0,
    }}>

      {/* Top bar — overview only, sits above the content card */}
      {isOverview && (
        <div style={{
          ...chrome,
          height: 33,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3px',
          flexShrink: 0,
        }}>
          <LogoBadge />
          <ThemeToggle mode={mode} onToggle={onToggle} />
        </div>
      )}

      {/* Content card */}
      <div style={{
        flex: 1,
        ...chrome,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        <div style={{
          flex: 1,
          background: t.surfaceInner,
          borderRadius: 13,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {slides.map((slide, i) => {
            const vis = i === cur;
            const { content, contentProps } = slide;

            let inner = null;
            if (content === 'overview') {
              inner = (
                <ProjectOverview
                  projects={contentProps.projects}
                  vis={vis}
                  sidebarW={sidebarW}
                  onNavigateTo={(id) => {
                    const idx = slides.findIndex((s) => s.id === id);
                    if (idx !== -1) onJump(idx);
                  }}
                />
              );
            } else if (content === 'bento') {
              inner = <BentoGrid images={contentProps.images} vis={vis} />;
            } else if (content === 'carousel') {
              inner = (
                <ImageCarousel
                  images={contentProps.images}
                  vis={vis}
                  onExitRight={() => {
                    const overviewIdx = slides.findIndex((s) => s.id === 'overview');
                    if (overviewIdx !== -1) onJump(overviewIdx);
                  }}
                />
              );
            } else if (content === 'video') {
              inner = <VideoBlock src={contentProps.src} caption={contentProps.caption} vis={vis} />;
            } else if (content === 'questions') {
              inner = <QuestionsContent questions={contentProps.questions} vis={vis} onRestart={onRestart} />;
            } else if (content === 'end') {
              inner = <EndContent vis={vis} />;
            }

            return (
              <SlideWrapper key={slide.id} vis={vis} dir={dir}>
                {inner}
              </SlideWrapper>
            );
          })}
        </div>
      </div>

      {/* Nav bar — overview only, sits below the content card */}
      {isOverview && (
        <div style={{
          ...chrome,
          overflow: 'visible',
          height: 52,
          position: 'relative',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            left: 5, top: 5, bottom: 5,
            background: t.surfaceInner,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
          }}>
            <NavDots cur={slideCur} total={total} labels={labels} onNav={onNav} />
          </div>
          <div style={{
            position: 'absolute',
            right: 5, top: 5, bottom: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <ArrBtn dir="l" disabled={slideCur === 0} onClick={onPrev} />
            <ArrBtn dir="r" disabled={slideCur === total - 1} onClick={onNext} />
          </div>
        </div>
      )}

    </div>
  );
}
