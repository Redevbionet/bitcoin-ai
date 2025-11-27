import React from 'react';
import { Scale, FileText, CheckCircle } from 'lucide-react';

export const LicenseView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-bitcoin-panel border border-bitcoin-border rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Scale size={32} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">License Information</h2>
            <p className="text-gray-400">Software Usage & Rights</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-black/30 p-6 rounded-lg border border-bitcoin-border font-mono text-sm text-gray-300 leading-relaxed">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <FileText size={16} /> BSD 3-Clause License
            </h3>
            
            <p className="mb-4">Copyright (c) 2024 Bitcoin AI Contributors</p>
            
            <p className="mb-4">
              Redistribution and use in source and binary forms, with or without modification, 
              are permitted provided that the following conditions are met:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mb-4 text-gray-400">
              <li>
                Redistributions of source code must retain the above copyright notice, 
                this list of conditions and the following disclaimer.
              </li>
              <li>
                Redistributions in binary form must reproduce the above copyright notice, 
                this list of conditions and the following disclaimer in the documentation 
                and/or other materials provided with the distribution.
              </li>
              <li>
                Neither the name of the copyright holder nor the names of its contributors 
                may be used to endorse or promote products derived from this software without 
                specific prior written permission.
              </li>
            </ol>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="uppercase font-bold text-xs text-red-400 mb-2">Disclaimer</p>
              <p className="text-gray-500 italic">
                THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
                ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
                WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
                IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
                INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
                BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
                DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
                LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
                OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
                OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bitcoin-panel border border-bitcoin-border rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Open Source Dependencies</h3>
          <ul className="space-y-3">
             <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">React</span>
                <span className="text-green-400 flex items-center gap-1"><CheckCircle size={12}/> MIT</span>
             </li>
             <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tailwind CSS</span>
                <span className="text-green-400 flex items-center gap-1"><CheckCircle size={12}/> MIT</span>
             </li>
             <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Google GenAI SDK</span>
                <span className="text-green-400 flex items-center gap-1"><CheckCircle size={12}/> Apache 2.0</span>
             </li>
          </ul>
        </div>
        <div className="bg-bitcoin-panel border border-bitcoin-border rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">Attributions</h3>
             <p className="text-sm text-gray-400 mb-2">
                Iconography provided by <a href="https://lucide.dev/" className="text-bitcoin-orange hover:underline">Lucide React</a>.
             </p>
             <p className="text-sm text-gray-400">
                Logo adapted from <a href="https://www.flaticon.com/" className="text-bitcoin-orange hover:underline">Flaticon</a>.
             </p>
        </div>
      </div>
    </div>
  );
};