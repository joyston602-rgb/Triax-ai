import React from 'react';

const TutorialLanding = ({ handleStartTutorial }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-purple-300 text-sm font-medium">Interactive Learning Experience</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CAD Fundamentals Tutorial
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Master the essential skills of 3D modeling through our comprehensive, hands-on tutorial. 
            Learn industry-standard CAD concepts step by step.
          </p>
        </div>
        {/* What You'll Learn Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">What You'll Learn</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="group p-8 bg-gradient-to-br from-green-900/50 to-slate-900/50 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧭</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3D Navigation</h3>
              <p className="text-gray-400 leading-relaxed">Master viewport controls, coordinate systems, and 3D space orientation.</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-blue-900/50 to-slate-900/50 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔷</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Primitive Shapes</h3>
              <p className="text-gray-400 leading-relaxed">Create cubes, spheres, cylinders, and cones - the building blocks of CAD.</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Transformations</h3>
              <p className="text-gray-400 leading-relaxed">Move, rotate, and scale objects with precision using professional tools.</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-orange-900/50 to-slate-900/50 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precision Work</h3>
              <p className="text-gray-400 leading-relaxed">Learn accurate positioning and measurement techniques for professional results.</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-red-900/50 to-slate-900/50 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Assembly Basics</h3>
              <p className="text-gray-400 leading-relaxed">Combine multiple objects to create complex structures and assemblies.</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-teal-900/50 to-slate-900/50 rounded-2xl border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
              <p className="text-gray-400 leading-relaxed">Professional workflow, organization, and design iteration techniques.</p>
            </div>
          </div>
          {/* Tutorial Overview */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Tutorial Overview</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Duration:</span> 15-20 minutes</p>
                <p className="text-gray-300"><span className="text-purple-400 font-semibold">Difficulty:</span> Beginner-friendly</p>
                <p className="text-gray-300"><span className="text-pink-400 font-semibold">Prerequisites:</span> None required</p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300"><span className="text-green-400 font-semibold">Steps:</span> 16 interactive lessons</p>
                <p className="text-gray-300"><span className="text-blue-400 font-semibold">Format:</span> Hands-on practice</p>
                <p className="text-gray-300"><span className="text-orange-400 font-semibold">Progress:</span> Self-paced learning</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center mb-16">
            <button 
              onClick={handleStartTutorial}
              className="group inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="mr-3 text-2xl">🚀</span>
              Start Interactive Tutorial
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="text-gray-400 mt-4 text-lg">
              Begin your journey into 3D modeling and CAD design
            </p>
          </div>
        </div>
        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group p-8 bg-gradient-to-br from-yellow-900/50 to-slate-900/50 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Learning Tips</h3>
            <ul className="text-gray-400 space-y-2 leading-relaxed">
              <li>• Take your time with each step</li>
              <li>• Practice the mouse controls</li>
              <li>• Experiment with different positions</li>
              <li>• Don't hesitate to repeat steps</li>
            </ul>
          </div>
          
          <div className="group p-8 bg-gradient-to-br from-cyan-900/50 to-slate-900/50 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Controls Preview</h3>
            <ul className="text-gray-400 space-y-2 leading-relaxed">
              <li>• <span className="text-cyan-300 font-semibold">Left-click + drag:</span> Rotate view</li>
              <li>• <span className="text-cyan-300 font-semibold">Right-click + drag:</span> Pan view</li>
              <li>• <span className="text-cyan-300 font-semibold">Scroll wheel:</span> Zoom in/out</li>
              <li>• <span className="text-cyan-300 font-semibold">Click object:</span> Select it</li>
            </ul>
          </div>
          
          <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">After Tutorial</h3>
            <ul className="text-gray-400 space-y-2 leading-relaxed">
              <li>• Explore the Playground mode</li>
              <li>• Try the Challenge mode</li>
              <li>• Create your own designs</li>
              <li>• Build complex assemblies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialLanding;
