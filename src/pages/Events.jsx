// src/pages/Events.jsx
import React, { useMemo, useState, useEffect } from "react";
import EventCard from "../components/EventCard/EventCard";
import LoadingSkeleton from "../components/LoadingSkeleton/LoadingSkeleton";
import EventModal from "../components/EventModal/EventModal";
import useDebounce from "../hooks/useDebounce";
import eventsData from "../data/events.json";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() { return new URLSearchParams(useLocation().search); }

const [data, setData] = React.useState([]);
const [loading, setLoading] = React.useState(true);
React.useEffect(() => {
  const t = setTimeout(() => {
    setData(eventsData);
    setLoading(false);
  }, 300);
  return () => clearTimeout(t);
}, []);
export default function Events() {
  const { data, loading } = useFakeFetch("/data/events.json", 500);
  const [openId, setOpenId] = useState(null);
  const [view, setView] = useState("grid");
  const query = useQuery();
  const navigate = useNavigate();

  const qParam = query.get("q") || "";
  const [search, setSearch] = useState(qParam);
  const debounced = useDebounce(search, 350);

  useEffect(() => {
    // mirror search to URL
    const sp = new URLSearchParams();
    if (search) sp.set("q", search);
    navigate({ pathname: "/events", search: sp.toString() }, { replace: true });
  }, [debounced]);

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const events = data || [];

  // simple filters (search only for now)
  const filtered = useMemo(() => {
    if (!events) return [];
    const s = (debounced || "").trim().toLowerCase();
    return events.filter((e) => {
      if (!s) return true;
      return (e.title || "").toLowerCase().includes(s) || (e.tags || []).join(" ").toLowerCase().includes(s) || (e.location||"").toLowerCase().includes(s);
    });
  }, [events, debounced]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  useEffect(()=> { if (page > pages) setPage(1); }, [pages]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 className="title">Events</h2>
        <div className="flex">
          <input placeholder="Search events..." value={search} onChange={(e)=>setSearch(e.target.value)} className="input" style={{ marginRight: 8 }} />
          <button className="btn" onClick={()=>setView(v => v==="grid"?"list":"grid")}>{view==="grid" ? "Table" : "Grid"}</button>
        </div>
      </div>

      {loading ? <LoadingSkeleton rows={6} /> : (
        <div>
          {pageItems.length === 0 ? <div className="card">No events found</div> : (
            view === "grid" ? (
              <div className="grid">
                {pageItems.map(ev => <EventCard key={ev.id} event={ev} onOpen={setOpenId} />)}
              </div>
            ) : (
              <table className="table card">
                <thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Seats</th><th /></tr></thead>
                <tbody>
                  {pageItems.map(ev => (
                    <tr key={ev.id}>
                      <td>{ev.title}</td>
                      <td>{new Date(ev.startDate).toLocaleString()}</td>
                      <td>{ev.location}</td>
                      <td>{(ev.seatsTotal||0)-(ev.seatsBooked||0)} left</td>
                      <td><button className="btn btn-primary" onClick={()=>setOpenId(ev.id)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 8 }}>
            <button className="btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
            <div className="small">Page {page} / {pages}</div>
            <button className="btn" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>Next</button>
          </div>
        </div>
      )}

      <EventModal event={(data||[]).find(e=>e.id===openId)} onClose={()=>setOpenId(null)} />
    </div>
  );
}
