import { useMemo, useState } from "react";
import "./App.css";
import { Combobox } from "./components/ui/combobox";
import { getAllMakes, getModelsByMakeIdAndYear } from "./service/api";
import { ComboboxOption } from "./types";

function App() {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [makes, setMakes] = useState<Array<ComboboxOption>>([]);
  const [model, setModel] = useState<string>("");
  const [models, setModels] = useState<Array<ComboboxOption>>([]);

  const years = useMemo(
    () =>
      Array.from({ length: 2024 - 1995 + 1 }, (_, i) => ({
        value: `${1995 + i}`,
        label: `${1995 + i}`,
      })),
    []
  );

  async function onYearChange(value: string) {
    setYear(value);
    setMakes([]);
    setModels([]);

    const makesResponse = await getAllMakes();

    const results = makesResponse?.Results.slice(0, 500).map(
      (make: { Make_ID: string; Make_Name: string }) => {
        return {
          value: String(make.Make_ID),
          label: make.Make_Name,
        };
      }
    );

    setMakes(results);
  }

  async function onMakeChange(value: string) {
    setMake(value);
    setModels([]);

    if (models.length === 0) {
      const modelsResponse = await getModelsByMakeIdAndYear(make, year);
      const results = modelsResponse?.Results.slice(0, 100).map(
        (model: { Model_ID: string; Model_Name: string }) => {
          return {
            value: String(model.Model_ID),
            label: model.Model_Name,
          };
        }
      );
      setModels(results);
    }
  }

  function onModelChange(value: string) {
    setModel(value);
    console.log(model);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 border-t border-orange-500 bg-gray-300 p-4 w-full max-w-screen-md mx-auto">
      <div className="flex flex-col items-center text-left mb-4">
        <p className="text-2xl font-bold text-black">Add your vehicle</p>
        <span className="text-black">Get an exact fit for your vehicle.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <Combobox 
          options={years}
          placeholder="1 | Year"
          onValueChange={onYearChange}
        />
        <Combobox
          options={makes}
          placeholder="2 | Make"
          onValueChange={onMakeChange}
          disabled={year === ""}
        />
        <Combobox
          options={models}
          placeholder="3 | Model"
          onValueChange={onModelChange}
          disabled={make === ""}
        />
        <Combobox
          options={[]}
          placeholder="4 | Engine"
          disabled={true}
          onValueChange={() => {}}
        />
      </div>
    </div>
  );
}

export default App;
