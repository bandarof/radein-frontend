'use client';

export default function Timeline({ items = [] }: { items?: any[] }) {
  if (!items || items.length === 0) {
    return <div className="text-gray-400">No experience items to show.</div>;
  }

  function formatDate(d: any) {
    if (!d) return 'Present';
    // Accept objects like { year: 2020, month: 5 } or ISO strings
    if (typeof d === 'string') {
      try {
        const dt = new Date(d);
        if (!isNaN(dt.getTime())) return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
      } catch (e) {}
      return d;
    }
    if (typeof d === 'object' && d.year) {
      const month = d.month ? d.month : 1;
      const dt = new Date(d.year, month - 1, 1);
      return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    }
    return String(d);
  }

  // Normalize items: ensure startDate/endDate/title/company/description
  const normalized = items.map((it) => {
    let start = it.startDate || it.started || (it.dateRange && it.dateRange.start);
    let end = it.endDate || it.ended || (it.dateRange && it.dateRange.end) || null;
    // LinkedIn positions may have startDate:{year,month}
    const title = it.title || it.position || (it['title']) || (it.role && it.role.name) || (it['jobTitle']) || 'Untitled';
    const company = (it.company && (it.company.name || it.company.localizedName)) || it.companyName || (it['companyName']) || (it.organization && it.organization.name) || null;
    const description = it.description || it.summary || it.note || null;
    return { start, end, title, company, description };
  }).sort((a,b) => {
    // sort by start year desc
    const aYear = a.start?.year || (a.start ? new Date(a.start).getFullYear() : 0);
    const bYear = b.start?.year || (b.start ? new Date(b.start).getFullYear() : 0);
    return bYear - aYear;
  });

  return (
    <div className="timeline">
      <ol className="relative border-l border-gray-700 ml-4 pl-6">
        {normalized.map((it, idx) => (
          <li className="mb-8 ml-2" key={idx}>
            <span className="absolute -left-[10px] flex items-center justify-center w-5 h-5 bg-cyan-400 rounded-full ring-4 ring-gray-900" />
            <div className="pb-1">
              <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-semibold text-white">{it.title}</h4>
                <span className="text-sm text-gray-400">{formatDate(it.start)} — {it.end ? formatDate(it.end) : 'Present'}</span>
              </div>
              {it.company && <div className="text-sm text-cyan-300">{it.company}</div>}
              {it.description && <p className="mt-2 text-gray-300 text-sm">{it.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
