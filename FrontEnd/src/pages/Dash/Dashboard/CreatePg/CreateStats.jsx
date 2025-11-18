import React from 'react'

import { Package, Lock, Plus, Check } from 'lucide-react';

function CreateStats({state, setState}) {
    const steps = [
    { id: 1, title: 'Basic Info', icon: Package },
    { id: 2, title: 'Privacy & Schedule', icon: Lock },
    { id: 3, title: 'Add Memories', icon: Plus },
    { id: 4, title: 'Review & Create', icon: Check }
  ];
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-cyan-50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-cyan-400" />
                Create New Capsule
              </h2>
              
              <div className="space-y-4">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = s.id === state;
                  const isCompleted = s.id < state;
                  return (
                    <div key={s.id} className="flex items-center gap-4 group">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                        isActive ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' :
                        'bg-gray-800/50 text-gray-500 border-gray-700/50'
                      } border-2`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isActive ? 'text-cyan-300' : isCompleted ? 'text-emerald-300' : 'text-gray-400'}`}>
                          {s.title}
                        </p>
                        <p className="text-xs text-gray-500">Step {idx + 1} of 4</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
  )
}

export default CreateStats