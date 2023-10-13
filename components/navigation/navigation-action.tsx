'use client';

import { Plus } from 'lucide-react';
import ActionTooltip from './action-tooltip';

export default function NavigationAction() {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add new server">
        <button className="group flex items-center">
          <div className="flex items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
