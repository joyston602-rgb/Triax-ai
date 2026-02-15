import React, { useState, useEffect } from 'react'
import { useScene } from '../context/SceneContext'

const PropertiesPanel = () => {
  const { selectedObject, updateObject } = useScene()
  const [localValues, setLocalValues] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    material: { color: '#888888', metalness: 0.1, roughness: 0.7 }
  })

  // Update local values when selected object changes
  useEffect(() => {
    if (selectedObject) {
      setLocalValues({
        position: {
          x: selectedObject.position[0] || 0,
          y: selectedObject.position[1] || 0,
          z: selectedObject.position[2] || 0
        },
        rotation: {
          x: (selectedObject.rotation[0] * 180 / Math.PI) || 0, // Convert radians to degrees
          y: (selectedObject.rotation[1] * 180 / Math.PI) || 0,
          z: (selectedObject.rotation[2] * 180 / Math.PI) || 0
        },
        scale: {
          x: selectedObject.scale[0] || 1,
          y: selectedObject.scale[1] || 1,
          z: selectedObject.scale[2] || 1
        },
        material: {
          color: selectedObject.material?.color || '#888888',
          metalness: selectedObject.material?.metalness || 0.1,
          roughness: selectedObject.material?.roughness || 0.7
        }
      })
    }
  }, [selectedObject])

  const handleValueChange = (category, axis, value) => {
    const newValues = {
      ...localValues,
      [category]: {
        ...localValues[category],
        [axis]: category === 'material' ? value : (parseFloat(value) || 0)
      }
    }
    setLocalValues(newValues)
    
    if (selectedObject && updateObject) {
      const updates = {}
      
      if (category === 'position') {
        updates.position = [newValues.position.x, newValues.position.y, newValues.position.z]
      } else if (category === 'rotation') {
        // Convert degrees to radians
        updates.rotation = [
          newValues.rotation.x * Math.PI / 180,
          newValues.rotation.y * Math.PI / 180,
          newValues.rotation.z * Math.PI / 180
        ]
      } else if (category === 'scale') {
        updates.scale = [newValues.scale.x, newValues.scale.y, newValues.scale.z]
      } else if (category === 'material') {
        updates.material = {
          ...selectedObject.material,
          [axis]: value // Use the raw value for material properties
        }
        console.log('Updating material:', updates.material)
      }
      
      updateObject(selectedObject.id, updates)
    }
  }

  const handleQuickTransform = (type, axis, amount) => {
    if (!selectedObject) return
    
    const current = localValues[type][axis]
    const newValue = current + amount
    handleValueChange(type, axis, newValue)
  }

  const resetTransform = (type) => {
    if (!selectedObject) return
    
    const resetValues = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }
    
    const newValues = {
      ...localValues,
      [type]: resetValues[type]
    }
    setLocalValues(newValues)
    
    if (type === 'position') {
      updateObject(selectedObject.id, { position: [0, 0, 0] })
    } else if (type === 'rotation') {
      updateObject(selectedObject.id, { rotation: [0, 0, 0] })
    } else if (type === 'scale') {
      updateObject(selectedObject.id, { scale: [1, 1, 1] })
    }
  }

  if (!selectedObject) {
    return (
      <div className="w-64 bg-gradient-to-br from-slate-900 to-slate-800 border-l border-purple-500/20 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
            <span className="text-4xl">📦</span>
          </div>
          <h3 className="text-white font-semibold mb-2">No Selection</h3>
          <p className="text-gray-400 text-sm">Select an object to edit properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gradient-to-br from-slate-900 to-slate-800 border-l border-purple-500/20 flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/50 to-slate-900/50">
        <h2 className="text-lg font-bold text-white">Properties</h2>
        <p className="text-sm text-purple-300">{selectedObject.type}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Position Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-white">Position</label>
            <button
              onClick={() => resetTransform('position')}
              className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              Reset
            </button>
          </div>
          <div className="space-y-1.5">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center gap-1.5">
                <label className="w-4 text-[10px] font-bold text-purple-400 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.1"
                  value={parseFloat(localValues.position[axis]).toFixed(2)}
                  onChange={(e) => handleValueChange('position', axis, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <div className="flex gap-0.5">
                  <button
                    onClick={() => handleQuickTransform('position', axis, -0.5)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('position', axis, 0.5)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rotation Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-white">Rotation</label>
            <button
              onClick={() => resetTransform('rotation')}
              className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              Reset
            </button>
          </div>
          <div className="space-y-1.5">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center gap-1.5">
                <label className="w-4 text-[10px] font-bold text-purple-400 uppercase">{axis}</label>
                <input
                  type="number"
                  step="1"
                  value={Math.round(localValues.rotation[axis])}
                  onChange={(e) => handleValueChange('rotation', axis, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <div className="flex gap-0.5">
                  <button
                    onClick={() => handleQuickTransform('rotation', axis, -15)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('rotation', axis, 15)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[90, 180, 270].map(deg => (
              <button
                key={deg}
                onClick={() => handleValueChange('rotation', 'y', deg)}
                className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded text-[10px] font-semibold text-white"
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>

        {/* Scale Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-white">Scale</label>
            <button
              onClick={() => resetTransform('scale')}
              className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              Reset
            </button>
          </div>
          <div className="space-y-1.5">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center gap-1.5">
                <label className="w-4 text-[10px] font-bold text-purple-400 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={parseFloat(localValues.scale[axis]).toFixed(1)}
                  onChange={(e) => handleValueChange('scale', axis, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <div className="flex gap-0.5">
                  <button
                    onClick={() => handleQuickTransform('scale', axis, -0.1)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('scale', axis, 0.1)}
                    className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded text-white text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Controls */}
        <div>
          <label className="block text-xs font-bold text-white mb-2">Material</label>
          <div className="space-y-2">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Color</label>
              <div className="flex gap-1.5">
                <input
                  type="color"
                  value={localValues.material.color}
                  onChange={(e) => handleValueChange('material', 'color', e.target.value)}
                  className="w-10 h-10 bg-slate-800 border border-purple-500/30 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={localValues.material.color}
                  onChange={(e) => handleValueChange('material', 'color', e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              
              <div className="mt-1.5 grid grid-cols-4 gap-1">
                {[
                  { name: 'Blue', color: '#0000ff' },
                  { name: 'Red', color: '#ff0000' },
                  { name: 'Green', color: '#00ff00' },
                  { name: 'Yellow', color: '#ffff00' }
                ].map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => handleValueChange('material', 'color', colorOption.color)}
                    className="w-full h-6 rounded border-2 border-purple-500/30 hover:border-purple-500 transition-all"
                    style={{ backgroundColor: colorOption.color }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Metalness: {localValues.material.metalness}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={localValues.material.metalness}
                onChange={(e) => handleValueChange('material', 'metalness', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Roughness: {localValues.material.roughness}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={localValues.material.roughness}
                onChange={(e) => handleValueChange('material', 'roughness', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Object Info */}
      <div className="p-3 border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="text-[10px] text-gray-400 space-y-0.5">
          <div className="flex justify-between">
            <span>ID:</span>
            <span className="text-purple-400 font-mono">{selectedObject.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="text-purple-400 font-semibold">{selectedObject.type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPanel
