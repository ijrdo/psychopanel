import "./styles.css";
import { useArchives } from "app/network-query/GetArchives";
import { Link } from "react-router-dom";
import Loading from "common/ui/loading/Loading";
import ErrorBoundary from "pages/error-boundary/ErrorBoundary";

export default function PanelArchivesInfo() {
  const { data, isLoading, error, refetch } = useArchives();
  if (isLoading) return <Loading />;
  if (error) return <ErrorBoundary onClick={refetch} />;

  return (
    <div id="volumes-panel-all">
      {data.volumes.map((ele, i) => (
        <div key={"Volume" + i} className="volume-box">
          <div className="volume-box-content">
            <h2>Volume - {ele.volumeNumber}</h2>
          </div>

          <div className="issues-list">
            {ele.issues.map((issue) => (
              <Link
                to={`volume-${ele.volumeNumber}/${
                  ele.volumeNumber > 16 ? issue : "Issue 1"
                }`}
                key={issue}
              >
                <span>{issue}</span>
                <p>&#x27A4;</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
