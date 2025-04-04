import { useState } from "react";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import "./MoodPage.css";
import { IFilm } from "../../hooks/types";
import { ProgressBar } from "react-loader-spinner";
import { Card } from "../../shared/CardBunny/CardBunny";

interface IMood {
  id: string;
  label: string;
  img: string;
}

export function MoodPage() {
  const { films, isLoading } = useGetAllFilms();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moodOptions: IMood[] = [
    { id: "Angry", label: "Angry", img: "/static/img/bad (2) 3.png" },
    { id: "Happy", label: "Happy", img: "/static/img/love (2) 3.png" },
    { id: "Calm", label: "Calm", img: "/static/img/happy 3.png" },
    { id: "Sad", label: "Sad", img: "/static/img/sad.png" },
  ];

  const filteredFilms: IFilm[] = selectedMood
    ? (films as IFilm[]).filter((film) => film.Mood === selectedMood)
    : [];

  const handleMoodClick = (mood: string) => {
    setSelectedMood(selectedMood === mood ? null : mood);
  };

  if (isLoading) {
    return (
      <div className="contener">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          borderColor="purple"
          barColor="green"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="contener">
      <Header />

      <h1 className="profileTitle">Mood Page</h1>

      <div className="mood-div">
        <div className="mood-buttons-container">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              className={`mood-button ${
                selectedMood === mood.id ? "active" : ""
              }`}
              onClick={() => handleMoodClick(mood.id)}
            >
              <img src={mood.img} alt={mood.label} />
              <span className="mood-name">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="films-container">
            <h2>
              {moodOptions.find((m) => m.id === selectedMood)?.label} Films
            </h2>
            {filteredFilms.length > 0 ? (
              <div className="films-grid">
                {filteredFilms.map((film) => (
                  <Card key={film.id} film={film} />
                ))}
              </div>
            ) : (
              <p className="no-results">No films found for this mood.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
