import React, { useState } from 'react'
import { useScene } from '../context/SceneContext'

const ObjectPanel = () => {
  const [activeCategory, setActiveCategory] = useState('primitives')

  // Safely access the scene context
  let addObject
  try {
    const sceneContext = useScene()
    addObject = sceneContext?.addObject || (() => {
      console.warn('addObject function not available')
    })
  } catch (error) {
    console.error('Scene context error in ObjectPanel:', error)
    addObject = () => {
      console.warn('Scene context not available, cannot add object')
    }
  }

  const shapeCategories = {
    primitives: {
      name: 'Basic Shapes',
      icon: '🔷',
      color: 'from-blue-500 to-indigo-600',
      shapes: [
        { id: 'cube', name: 'Cube', icon: '⬜', description: 'Basic cube shape', color: 'bg-blue-100 text-blue-700' },
        { id: 'sphere', name: 'Sphere', icon: '⚪', description: 'Perfect sphere', color: 'bg-indigo-100 text-indigo-700' },
        { id: 'cylinder', name: 'Cylinder', icon: '🥫', description: 'Cylindrical shape', color: 'bg-purple-100 text-purple-700' },
        { id: 'cone', name: 'Cone', icon: '🔺', description: 'Conical shape', color: 'bg-pink-100 text-pink-700' },
        { id: 'torus', name: 'Torus', icon: '🍩', description: 'Donut shape', color: 'bg-cyan-100 text-cyan-700' },
        { id: 'plane', name: 'Plane', icon: '▭', description: 'Flat surface', color: 'bg-gray-100 text-gray-700' },
        { id: 'pyramid', name: 'Pyramid', icon: '🔻', description: 'Pyramid shape', color: 'bg-orange-100 text-orange-700' },
        { id: 'octahedron', name: 'Octahedron', icon: '💎', description: 'Eight-sided shape', color: 'bg-teal-100 text-teal-700' },
        { id: 'tetrahedron', name: 'Tetrahedron', icon: '🔷', description: 'Four-sided shape', color: 'bg-sky-100 text-sky-700' },
      ]
    },
    assistive: {
      name: 'Assistive Shapes',
      icon: '♿',
      color: 'from-green-500 to-emerald-600',
      shapes: [
        { id: 'grip-handle', name: 'Grip Handle', icon: '🤏', description: 'Ergonomic handle shape', color: 'bg-green-100 text-green-700' },
        { id: 'button-large', name: 'Large Button', icon: '🔘', description: 'Accessible button', color: 'bg-emerald-100 text-emerald-700' },
        { id: 'ramp', name: 'Ramp', icon: '📐', description: 'Accessibility ramp', color: 'bg-teal-100 text-teal-700' },
        { id: 'lever', name: 'Lever', icon: '🎚️', description: 'Easy-use lever', color: 'bg-lime-100 text-lime-700' },
      ]
    }
  }

  const getRandomColor = () => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleShapeAdd = (shapeType) => {
    console.log('Adding shape:', shapeType)
    
    try {
      const newObject = {
        id: Date.now(),
        type: shapeType,
        position: [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 4 - 2], // Random position
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        material: {
          color: getRandomColor(),
          metalness: 0.1,
          roughness: 0.7
        }
      }
      
      addObject(newObject)
    } catch (error) {
      console.error('Error adding shape:', error)
    }
  }

  return (
    <div className="w-80 bg-gradient-to-br from-slate-900 to-slate-800 border-r border-purple-500/20 shadow-2xl h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-900/50 to-slate-900/50 border-b border-purple-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-white text-lg">🎨</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Shape Library</h2>
            <p className="text-xs text-gray-400">Add objects to your scene</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-3 bg-slate-900/50 border-b border-purple-500/20">
        <div className="flex gap-2">
          {Object.entries(shapeCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{category.icon}</span>
              <span className="hidden lg:inline">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shapes Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 bg-gradient-to-r ${shapeCategories[activeCategory].color} rounded-lg flex items-center justify-center shadow-lg`}>
              <span className="text-white">{shapeCategories[activeCategory].icon}</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              {shapeCategories[activeCategory].name}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {shapeCategories[activeCategory].shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleShapeAdd(shape.id)}
                className="group p-3 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-purple-500/30">
                    <span className="text-lg">{shape.icon}</span>
                  </div>
                  <h4 className="font-semibold text-white text-[10px] text-center group-hover:text-purple-400 transition-colors duration-200 leading-tight">
                    {shape.name}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="p-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-t border-purple-500/20">
        <h4 className="text-xs font-bold text-gray-400 mb-3">Quick Add</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleShapeAdd('cube')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-lg hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 text-xs font-semibold text-white"
          >
            <span>⬜</span>
            <span>Cube</span>
          </button>
          <button
            onClick={() => handleShapeAdd('sphere')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-lg hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 text-xs font-semibold text-white"
          >
            <span>⚪</span>
            <span>Sphere</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ObjectPanel
