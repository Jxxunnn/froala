'use client';

import { useState } from 'react';
import EditingArea from './EditingArea';
import Toolbar from './Toolbar';

export default function PageBuilder() {
  const [contentBlocks, setContentBlocks] = useState<string[]>([]);

  const handleAddBlock = (block: string) => {
    setContentBlocks((prev) => [...prev, block]);
  };

  const handleRemoveBlock = (index: number) => {
    setContentBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="flex">
      <div className="flex-1">
        <EditingArea contentBlocks={contentBlocks} handleRemoveBlock={handleRemoveBlock} />
      </div>
      <div className="min-h-screen w-[390px] bg-zinc-900">
        <Toolbar handleAddBlock={handleAddBlock} />
      </div>
    </main>
  );
}
