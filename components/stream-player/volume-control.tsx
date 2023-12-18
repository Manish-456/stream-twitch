import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Hint } from "@/components/hint";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}
export function VolumeControl({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  const onVolumeChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white hover:bg-white/10 rounded-lg p-1.5"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>

      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={onVolumeChange}
        value={[value]}
        step={1}
        max={100}
      />
    </div>
  );
}
