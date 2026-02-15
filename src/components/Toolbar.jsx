import React, { useState, useEffect } from 'react'
import { useScene } from '../context/SceneContext'
import { ObjectFactory } from '../three/ObjectFactory'
import * as THREE from 'three'

const Toolbar = () => {
  const { 
    transformMode, 
    setTransformMode, 
    selectedObject, 
    clearScene,
    scene,
    updateSceneSettings,
    duplicateObject,
    deleteSelectedObject,
    addObject
  } = useScene()

  const [activeSection, setActiveSection] = useState('transform')
  const [measurementPoints, setMeasurementPoints] = useState([])
  const [measurementMode, setMeasurementMode] = useState(null)

  // Add click listener for measurements
  useEffect(() => {
    const handleSceneClick = (event) => {
      if (!measurementMode) return
      
      // Get click position (simplified - in real app you'd raycast to 3D position)
      const rect = event.target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      const point = new THREE.Vector3(x * 5, y * 5, 0) // Convert to 3D coordinates
      
      const newPoints = [...measurementPoints, point]
      setMeasurementPoints(newPoints)
      
      if (measurementMode === 'measure-distance' && newPoints.length === 2) {
        const distance = newPoints[0].distanceTo(newPoints[1])
        alert(`Distance: ${distance.toFixed(2)} units`)
        setMeasurementPoints([])
        setMeasurementMode(null)
        setTransformMode('select')
      } else if (measurementMode === 'measure-angle' && newPoints.length === 3) {
        const v1 = new THREE.Vector3().subVectors(newPoints[0], newPoints[1])
        const v2 = new THREE.Vector3().subVectors(newPoints[2], newPoints[1])
        const angle = v1.angleTo(v2) * (180 / Math.PI)
        alert(`Angle: ${angle.toFixed(1)}°`)
        setMeasurementPoints([])
        setMeasurementMode(null)
        setTransformMode('select')
      }
    }

    if (measurementMode) {
      document.addEventListener('click', handleSceneClick)
      return () => document.removeEventListener('click', handleSceneClick)
    }
  }, [measurementMode, measurementPoints, setTransformMode])

  const tools = [
    { id: 'select', name: 'Select', icon: '🔍', shortcut: 'V', color: 'from-blue-500 to-blue-600' },
    { id: 'move', name: 'Move (Click to Place)', icon: '↔️', shortcut: 'G', color: 'from-green-500 to-green-600' },
    { id: 'rotate', name: 'Rotate', icon: '🔄', shortcut: 'R', color: 'from-purple-500 to-purple-600' },
    { id: 'scale', name: 'Scale', icon: '📏', shortcut: 'S', color: 'from-amber-500 to-amber-600' },
    { id: 'align', name: 'Align', icon: '📐', shortcut: 'A', color: 'from-cyan-500 to-cyan-600' },
  ]

  const createTools = [
    { id: 'cube', name: 'Cube', icon: '⬜', shortcut: 'C' },
    { id: 'sphere', name: 'Sphere', icon: '⚪', shortcut: 'Shift+S' },
    { id: 'cylinder', name: 'Cylinder', icon: '🥫', shortcut: 'Shift+C' },
    { id: 'cone', name: 'Cone', icon: '🔺', shortcut: 'Shift+O' },
    { id: 'plane', name: 'Plane', icon: '▭', shortcut: 'P' },
    { id: 'pyramid', name: 'Pyramid', icon: '🔻', shortcut: 'Shift+P' },
    { id: 'torus', name: 'Torus', icon: '🍩', shortcut: 'T' },
    { id: 'gear', name: 'Gear', icon: '⚙️', shortcut: 'Shift+G' },
  ]

  const advancedTools = [
    { id: 'torusknot', name: 'Torus Knot', icon: '🪢', shortcut: 'K' },
    { id: 'dodecahedron', name: 'Dodecahedron', icon: '⬟', shortcut: 'D' },
    { id: 'icosahedron', name: 'Icosahedron', icon: '🔷', shortcut: 'I' },
    { id: 'ring', name: 'Ring', icon: '⭕', shortcut: 'Shift+R' },
    { id: 'capsule', name: 'Capsule', icon: '💊', shortcut: 'Shift+A' },
    { id: 'spring', name: 'Spring', icon: '🌀', shortcut: 'Shift+Z' },
  ]

  const measureTools = [
    { id: 'measure-distance', name: 'Distance', icon: '📏', shortcut: 'M' },
    { id: 'measure-angle', name: 'Angle', icon: '📐', shortcut: 'Shift+M' },
    { id: 'measure-area', name: 'Area', icon: '📊', shortcut: 'Alt+M' },
  ]

  const cadTools = [
    { id: 'extrude', name: 'Extrude', icon: '⬆️', shortcut: 'E' },
    { id: 'revolve', name: 'Revolve', icon: '🔄', shortcut: 'Shift+R' },
    { id: 'loft', name: 'Loft', icon: '🌊', shortcut: 'L' },
    { id: 'sweep', name: 'Sweep', icon: '🧹', shortcut: 'Shift+W' },
  ]

  const actions = [
    { id: 'duplicate', name: 'Duplicate', icon: '📋', shortcut: 'Ctrl+D' },
    { id: 'delete', name: 'Delete', icon: '🗑️', shortcut: 'Del' },
    { id: 'group', name: 'Group', icon: '📦', shortcut: 'Ctrl+G' },
    { id: 'ungroup', name: 'Ungroup', icon: '📤', shortcut: 'Ctrl+Shift+G' },
  ]

  const viewControls = [
    { id: 'grid', name: 'Toggle Grid', icon: '⊞', shortcut: 'G' },
    { id: 'wireframe', name: 'Wireframe', icon: '🕸️', shortcut: 'W' },
    { id: 'orthographic', name: 'Orthographic', icon: '📐', shortcut: 'O' },
    { id: 'perspective', name: 'Perspective', icon: '👁️', shortcut: 'Shift+O' },
  ]

  const sections = [
    { id: 'transform', name: 'Transform', icon: '🔧' },
    { id: 'measure', name: 'Measure', icon: '📏' },
    { id: 'cad', name: 'CAD', icon: '⚙️' },
  ]

  const handleToolClick = (toolId) => {
    setTransformMode(toolId)
    console.log(`Tool selected: ${toolId}`)
  }

  const handleCreateTool = (toolId) => {
    console.log(`Create tool clicked: ${toolId}`)
    try {
      let object
      switch (toolId) {
        case 'cube':
          console.log('Creating cube...')
          object = ObjectFactory.createCube()
          break
        case 'sphere':
          console.log('Creating sphere...')
          object = ObjectFactory.createSphere()
          break
        case 'cylinder':
          console.log('Creating cylinder...')
          object = ObjectFactory.createCylinder()
          break
        case 'cone':
          console.log('Creating cone...')
          object = ObjectFactory.createCone()
          break
        case 'plane':
          console.log('Creating plane...')
          object = ObjectFactory.createPlane()
          break
        case 'pyramid':
          console.log('Creating pyramid...')
          object = ObjectFactory.createPyramid()
          break
        case 'torus':
          console.log('Creating torus...')
          object = ObjectFactory.createTorus()
          break
        case 'gear':
          console.log('Creating gear...')
          object = ObjectFactory.createGear()
          break
        default:
          console.log(`Unknown create tool: ${toolId}`)
          return
      }
      
      if (object) {
        object.userData = { type: toolId, id: Date.now() }
        console.log('Calling addObject with:', object)
        addObject(object)
        console.log(`Successfully created ${toolId}`)
      } else {
        console.error(`Failed to create object for ${toolId}`)
      }
    } catch (error) {
      console.error(`Error creating ${toolId}:`, error)
    }
  }

  const handleMeasureTool = (toolId) => {
    console.log(`Measure tool clicked: ${toolId}`)
    setTransformMode(toolId)
    setMeasurementMode(toolId)
    setMeasurementPoints([])
    
    // Show instructions to user
    switch (toolId) {
      case 'measure-distance':
        alert('Distance Tool: Click on two points in the 3D scene to measure distance')
        break
      case 'measure-angle':
        alert('Angle Tool: Click on three points in the 3D scene to measure angle')
        break
      case 'measure-area':
        if (selectedObject) {
          // Calculate area for selected object
          const geometry = selectedObject.geometry
          if (geometry) {
            let area = 0
            if (geometry.type === 'BoxGeometry') {
              const params = geometry.parameters
              area = 2 * (params.width * params.height + params.width * params.depth + params.height * params.depth)
            } else if (geometry.type === 'SphereGeometry') {
              const radius = geometry.parameters.radius
              area = 4 * Math.PI * radius * radius
            }
            alert(`Surface Area: ${area.toFixed(2)} square units`)
          }
        } else {
          alert('Area Tool: Please select an object first')
        }
        break
    }
  }

  const handleCADTool = (toolId) => {
    console.log(`CAD tool clicked: ${toolId}`)
    if (!selectedObject) {
      alert(`${toolId} requires a selected object`)
      return
    }
    
    switch (toolId) {
      case 'extrude':
        console.log('Extrude operation on selected object')
        break
      case 'revolve':
        console.log('Revolve operation on selected object')
        break
      case 'loft':
        console.log('Loft operation - select multiple objects')
        break
      case 'sweep':
        console.log('Sweep operation on selected object')
        break
      default:
        console.log(`CAD tool: ${toolId}`)
    }
  }

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'duplicate':
        if (selectedObject) {
          duplicateObject()
          console.log('Object duplicated')
        }
        break
      case 'delete':
        if (selectedObject) {
          deleteSelectedObject()
          console.log('Object deleted')
        }
        break
      case 'group':
        console.log('Group selected objects')
        break
      case 'ungroup':
        console.log('Ungroup selected group')
        break
      default:
        console.log(`Action: ${actionId}`)
    }
  }

  const handleViewControlClick = (controlId) => {
    switch (controlId) {
      case 'grid':
        updateSceneSettings({ gridVisible: !scene.gridVisible })
        console.log(`Grid ${!scene.gridVisible ? 'enabled' : 'disabled'}`)
        break
      case 'wireframe':
        updateSceneSettings({ wireframe: !scene.wireframe })
        console.log(`Wireframe ${!scene.wireframe ? 'enabled' : 'disabled'}`)
        break
      case 'orthographic':
        updateSceneSettings({ cameraType: 'orthographic' })
        console.log('Switched to orthographic camera')
        break
      case 'perspective':
        updateSceneSettings({ cameraType: 'perspective' })
        console.log('Switched to perspective camera')
        break
      default:
        console.log(`View control: ${controlId}`)
    }
  }

  const handleNewScene = () => {
    if (window.confirm('Create new scene? This will clear all objects.')) {
      clearScene()
      console.log('Scene cleared')
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-purple-500/20 shadow-2xl backdrop-blur-sm sticky top-20 z-40">
      <div className="px-4 py-3">
        {/* Section Tabs */}
        <div className="flex items-center gap-2 mb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-purple-500/20'
              }`}
            >
              <span>{section.icon}</span>
              <span className="text-sm font-medium">{section.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {/* Left Section - Dynamic Tools */}
          <div className="flex items-center gap-4">
            {/* File Operations */}
            <button 
              onClick={handleNewScene}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              title="New Scene (Ctrl+N)"
            >
              <span className="text-lg">📄</span>
              <span className="text-sm">New</span>
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-purple-500/30"></div>

            {/* Dynamic Tool Section */}
            {activeSection === 'transform' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Transform:</span>
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`group relative p-2 rounded-lg transition-all duration-200 ${
                      transformMode === tool.id 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 scale-110' 
                        : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40'
                    }`}
                    title={`${tool.name} (${tool.shortcut})`}
                  >
                    <span className="text-lg">{tool.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {activeSection === 'measure' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Measure:</span>
                {measureTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleMeasureTool(tool.id)}
                    className={`group p-2 rounded-lg transition-all duration-200 ${
                      transformMode === tool.id 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/50 scale-110' 
                        : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40'
                    }`}
                    title={`${tool.name} (${tool.shortcut})`}
                  >
                    <span className="text-lg">{tool.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {activeSection === 'cad' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">CAD:</span>
                {cadTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleCADTool(tool.id)}
                    className={`group p-2 rounded-lg transition-all duration-200 ${
                      !selectedObject 
                        ? 'bg-slate-800/50 border border-purple-500/10 opacity-40 cursor-not-allowed' 
                        : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40 hover:scale-105'
                    }`}
                    title={`${tool.name} (${tool.shortcut})`}
                    disabled={!selectedObject}
                  >
                    <span className="text-lg">{tool.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Separator */}
            <div className="w-px h-6 bg-purple-500/30"></div>

            {/* Action Tools */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">Actions:</span>
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className={`group p-2 rounded-lg transition-all duration-200 ${
                    (action.id === 'duplicate' || action.id === 'delete') && !selectedObject 
                      ? 'bg-slate-800/50 border border-purple-500/10 opacity-40 cursor-not-allowed' 
                      : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40 hover:scale-105'
                  }`}
                  title={`${action.name} (${action.shortcut})`}
                  disabled={action.id === 'duplicate' || action.id === 'delete' ? !selectedObject : false}
                >
                  <span className="text-lg">{action.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">View:</span>
            {viewControls.map((control) => (
              <button
                key={control.id}
                onClick={() => handleViewControlClick(control.id)}
                className={`group p-2 rounded-lg transition-all duration-200 ${
                  (control.id === 'grid' && scene.gridVisible) ||
                  (control.id === 'wireframe' && scene.wireframe)
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/50' 
                    : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/40'
                }`}
                title={`${control.name} (${control.shortcut})`}
              >
                <span className="text-lg">{control.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        {selectedObject && (
          <div className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-slate-900/50 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-purple-300">
                  Selected: <span className="capitalize text-white">{selectedObject.userData?.type || selectedObject.type}</span>
                </span>
                <span className="text-gray-400">
                  Mode: <span className="capitalize font-semibold text-purple-300">{transformMode}</span>
                </span>
                <span className="text-gray-400">
                  Section: <span className="capitalize font-semibold text-purple-300">{activeSection}</span>
                </span>
              </div>
              <div className="text-gray-400">
                Press <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-purple-500/30 text-xs font-mono text-purple-300">Esc</kbd> to deselect
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Toolbar
