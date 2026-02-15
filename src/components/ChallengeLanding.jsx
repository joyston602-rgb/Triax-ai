import React from 'react';

const ChallengeLanding = ({ challengesData, completedChallenges, categorizedChallenges, setSelectedChallenge, isUnlocked }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-purple-300 text-sm font-medium">Hands-On Learning Challenges</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CAD Challenges
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master CAD skills through hands-on challenges focused on assistive technology
            </p>
            
            <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
              <div className="p-6 bg-gradient-to-br from-cyan-900/50 to-slate-900/50 rounded-2xl border border-cyan-500/20 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  {challengesData.challenges.length}
                </div>
                <div className="text-gray-300 font-semibold">Total Challenges</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-900/50 to-slate-900/50 rounded-2xl border border-green-500/20 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                  {challengesData.challenges.filter(c => c.assistiveTechFocus).length}
                </div>
                <div className="text-gray-300 font-semibold">Assistive Tech</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-20">
          {/* Challenges by Category */}
          {Object.entries(categorizedChallenges).map(([categoryKey, challenges]) => {
            const categoryInfo = challengesData.categories[categoryKey];
            
            return (
              <div key={categoryKey} className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/50">
                    <span className="text-2xl">{categoryInfo.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{categoryInfo.name}</h2>
                    <p className="text-gray-400">{categoryInfo.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge) => {
                    const isCompleted = completedChallenges.includes(challenge.id);
                    const locked = !isUnlocked(challenge.id);

                    return (
                      <div 
                        key={challenge.id} 
                        className={`group relative p-5 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl border border-purple-500/20 transition-all duration-300 ${
                          locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500/40 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20'
                        }`}
                        onClick={() => !locked && setSelectedChallenge(challenge)}
                      >
                        {locked && (
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <span className="text-sm">🔒</span>
                            </div>
                          </div>
                        )}
                        
                        {isCompleted && (
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                              <span className="text-sm">✓</span>
                            </div>
                          </div>
                        )}

                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-200 line-clamp-1">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                challenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                challenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {challenge.difficulty}
                              </span>
                              {challenge.assistiveTechFocus && (
                                <span className="text-lg">♿</span>
                              )}
                          </div>
                        </div>

                        <p className="text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">
                          {challenge.description}
                        </p>

                        <div className="mb-3">
                          <div className="flex items-center text-xs text-gray-400 mb-2">
                            <span className="mr-1">⏱️</span>
                            <span>{challenge.estimatedTime} min</span>
                          </div>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {challenge.objectives.slice(0, 1).map((objective, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-1 text-purple-400">•</span>
                                <span className="line-clamp-1">{objective}</span>
                              </li>
                            ))}
                            <li className="text-purple-400 text-xs font-medium">
                              +{challenge.objectives.length - 1} more objectives
                            </li>
                          </ul>
                        </div>

                        <button
                          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            locked 
                              ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                          }`}
                          disabled={locked}
                        >
                          {locked ? 'Locked' : 'Start Challenge'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChallengeLanding;
