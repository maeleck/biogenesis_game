import React, { useMemo } from 'react';
import { Upgrade } from '../types';

interface MapLinesProps {
  upgrades: Upgrade[];
  purchasedUpgrades: Set<string>;
  visibleUpgrades: Upgrade[];
}

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 2500;

const MapLines: React.FC<MapLinesProps> = ({ upgrades, purchasedUpgrades, visibleUpgrades }) => {
  const upgradeMap = useMemo(() => {
    const map = new Map<string, Upgrade>();
    upgrades.forEach(u => map.set(u.id, u));
    return map;
  }, [upgrades]);

  const visibleUpgradeIds = useMemo(() => new Set(visibleUpgrades.map(u => u.id)), [visibleUpgrades]);

  const lines = useMemo(() => {
    const lineData: { key: string; x1: number; y1: number; x2: number; y2: number; isPurchased: boolean; shouldAnimate: boolean; isPreview: boolean }[] = [];
    const drawnLines = new Set<string>();

    visibleUpgrades.forEach(upgrade => {
      const addLine = (depId: string, isPreview: boolean) => {
        const key = `${depId}-${upgrade.id}`;
        if (drawnLines.has(key)) return;
        
        const depUpgrade = upgradeMap.get(depId);
        if (depUpgrade) {
          const isChildPurchased = purchasedUpgrades.has(upgrade.id);
          const realDepsMet = (upgrade.dependencies || []).every(d => purchasedUpgrades.has(d));
          
          if (isPreview && realDepsMet) return;

          drawnLines.add(key);
          lineData.push({
            key,
            x1: depUpgrade.position.x / 100 * MAP_WIDTH,
            y1: depUpgrade.position.y / 100 * MAP_HEIGHT,
            x2: upgrade.position.x / 100 * MAP_WIDTH,
            y2: upgrade.position.y / 100 * MAP_HEIGHT,
            isPurchased: isChildPurchased,
            shouldAnimate: !isChildPurchased && visibleUpgradeIds.has(upgrade.id),
            isPreview
          });
        }
      };

      if (upgrade.dependencies) {
        upgrade.dependencies.forEach(depId => addLine(depId, false));
      }
      if (upgrade.previewDependencies) {
        upgrade.previewDependencies.forEach(depId => addLine(depId, true));
      }
    });
    return lineData;
  }, [visibleUpgrades, purchasedUpgrades, upgradeMap, visibleUpgradeIds]);

  return (
    <>
      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="absolute top-0 left-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .line-base {
                transition: stroke 0.5s ease;
              }
              .line-drawing {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw-line 1.5s ease-out forwards;
              }
              @keyframes draw-line {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>
        <g>
          {lines.map(({ key, x1, y1, x2, y2, isPurchased, shouldAnimate, isPreview }) => (
            <line
              key={key}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isPurchased ? 'rgb(168 85 247)' : 'rgba(100, 116, 139, 0.5)'}
              strokeWidth="3"
              strokeDasharray={isPreview ? '5 5' : 'none'}
              className={`line-base ${shouldAnimate && !isPreview ? 'line-drawing' : ''}`}
            />
          ))}
        </g>
      </svg>
    </>
  );
};

export default MapLines;