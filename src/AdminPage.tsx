import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('');
  const [guestName, setGuestName] = useState('');
  
  const [linkType, setLinkType] = useState<'invite' | 'confirm'>('invite');
  const [generated, setGenerated] = useState<{
    url: string;
    confirmUrl: string;
    message: string;
    confirmMessage: string;
  } | null>(null);
  const [copiedType, setCopiedType] = useState<'link' | 'message' | 'confirmLink' | 'confirmMessage' | null>(null);

  const generateMessage = (pfx: string, name: string, url: string) => {
    const fullName = pfx ? `${pfx} ${name}` : name;
    return `Dear ${fullName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${url}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Shakila & Madawa`;
  };

  const generateConfirmMessage = (pfx: string, name: string, url: string) => {
    const fullName = pfx ? `${pfx} ${name}` : name;
    return `Dear ${fullName} ❤️\n\nWe warmly remind you to kindly confirm your attendance for our wedding celebration on Thursday, September 24, 2026.\n\nPlease submit your confirmation by September 14, 2026 through the link below 🌐:\n\n${url}\n\nYour response will help us make the best arrangements. We look forward to celebrating together!\n\nWith love,\n❤️ Shakila & Madawa`;
  };

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const trimmed = guestName.trim();
    const url = `${window.location.origin}/?prefix=${encodeURIComponent(prefix)}&guest=${encodeURIComponent(trimmed)}`;
    const confirmUrl = `${window.location.origin}/confirm?prefix=${encodeURIComponent(prefix)}&guest=${encodeURIComponent(trimmed)}`;
    const message = generateMessage(prefix, trimmed, url);
    const confirmMessage = generateConfirmMessage(prefix, trimmed, confirmUrl);
    setGenerated({ url, confirmUrl, message, confirmMessage });
  };

  const copyToClipboard = (text: string, type: 'link' | 'message' | 'confirmLink' | 'confirmMessage') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10 mb-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center mb-4 shadow-inner">
            <LinkIcon className="text-[#8B7355] w-6 h-6" />
          </div>
          <h1 className="serif text-3xl md:text-4xl text-[#3D2B1F] tracking-widest uppercase font-bold text-center">Link Generator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B7355] mb-2">Select Prefix</label>
            <select 
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full p-4 border border-zinc-200 rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#C8B29E] font-serif text-[#3D2B1F] text-xl"
            >
              <option value="">No Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B7355] mb-2">Guest Name</label>
            <input 
              type="text" 
              placeholder="e.g. Sanjaya" 
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-4 border border-zinc-200 rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#C8B29E] font-serif text-[#3D2B1F] text-xl"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full py-4 bg-[#C8B29E] text-white rounded-xl uppercase tracking-widest font-bold text-base hover:bg-[#b09780] transition-colors disabled:opacity-50 shadow-md cursor-pointer"
          >
            Generate Links
          </button>
        </div>
      </div>

      {generated && (
        <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Tabs for switching between Invitation link and Confirmation link */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#EAE1D3] mb-6">
            <button
              type="button"
              onClick={() => setLinkType('invite')}
              className={`py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                linkType === 'invite' ? 'bg-[#3D2B1F] text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Full Invitation
            </button>
            <button
              type="button"
              onClick={() => setLinkType('confirm')}
              className={`py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                linkType === 'confirm' ? 'bg-[#8B7355] text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Confirmation (/confirm)
            </button>
          </div>

          {linkType === 'invite' ? (
            <div>
              <h2 className="serif text-2xl text-[#3D2B1F] uppercase tracking-widest font-bold mb-4 text-center">Invitation Message</h2>
              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-zinc-200 mb-6 font-serif text-[#3D2B1F] whitespace-pre-wrap text-[15px] leading-relaxed">
                {generated.message}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => copyToClipboard(generated.url, 'link')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-bold cursor-pointer ${copiedType === 'link' ? 'bg-green-100 text-green-600' : 'bg-[#FAF7F2] text-[#8B7355] border border-[#EAE1D3] hover:bg-[#EAE1D3]'}`}
                >
                  {copiedType === 'link' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  Copy Link Only
                </button>
                <button 
                  onClick={() => copyToClipboard(generated.message, 'message')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-bold cursor-pointer ${copiedType === 'message' ? 'bg-green-100 text-green-600' : 'bg-[#C8B29E] text-white hover:bg-[#b09780] shadow-md'}`}
                >
                  {copiedType === 'message' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  Copy Full Message
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="serif text-2xl text-[#3D2B1F] uppercase tracking-widest font-bold mb-4 text-center">Confirmation Message</h2>
              <p className="text-xs text-center text-zinc-500 mb-4 uppercase tracking-wider">
                Directs guest to /confirm to submit attendance &amp; guest count by Sept 14
              </p>
              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-zinc-200 mb-6 font-serif text-[#3D2B1F] whitespace-pre-wrap text-[15px] leading-relaxed">
                {generated.confirmMessage}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => copyToClipboard(generated.confirmUrl, 'confirmLink')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-bold cursor-pointer ${copiedType === 'confirmLink' ? 'bg-green-100 text-green-600' : 'bg-[#FAF7F2] text-[#8B7355] border border-[#EAE1D3] hover:bg-[#EAE1D3]'}`}
                >
                  {copiedType === 'confirmLink' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  Copy Confirm Link
                </button>
                <button 
                  onClick={() => copyToClipboard(generated.confirmMessage, 'confirmMessage')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-bold cursor-pointer ${copiedType === 'confirmMessage' ? 'bg-green-100 text-green-600' : 'bg-[#8B7355] text-white hover:bg-[#725e46] shadow-md'}`}
                >
                  {copiedType === 'confirmMessage' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  Copy Confirm Message
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
