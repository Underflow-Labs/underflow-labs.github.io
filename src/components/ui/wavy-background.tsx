"use client";

import { cn } from "@/lib/utils";
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { createNoise3D } from "simplex-noise";

type WavyBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
};

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const noise = createNoise3D();
    const waveColors = colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];

    let width = 0;
    let height = 0;
    let nt = 0;

    const speedValue = speed === "slow" ? 0.001 : 0.002;

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = width;
      canvas.height = height;
    };

    const drawWave = (index: number) => {
      ctx.beginPath();
      ctx.lineWidth = waveWidth ?? 50;
      ctx.lineCap = "round";
      ctx.strokeStyle = waveColors[index % waveColors.length];

      for (let x = 0; x < width; x += 5) {
        const y = noise(x / 800, 0.3 * index, nt) * 100;
        ctx.lineTo(x, y + height * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    };

    const render = () => {
      nt += speedValue;
      ctx.globalAlpha = waveOpacity;
      ctx.fillStyle = backgroundFill ?? "black";
      ctx.fillRect(0, 0, width, height);

      for (let index = 0; index < 5; index += 1) {
        drawWave(index);
      }

      animationIdRef.current = window.requestAnimationFrame(render);
    };

    resizeCanvas();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resizeCanvas)
        : null;

    resizeObserver?.observe(container);
    window.addEventListener("resize", resizeCanvas);
    render();

    return () => {
      if (animationIdRef.current !== null) {
        window.cancelAnimationFrame(animationIdRef.current);
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [backgroundFill, blur, colors, speed, waveOpacity, waveWidth]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-full w-full overflow-hidden", containerClassName)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        id="canvas"
        style={{ filter: `blur(${blur}px)` }}
      />
      {children ? <div className={cn("relative z-10", className)}>{children}</div> : null}
    </div>
  );
}
