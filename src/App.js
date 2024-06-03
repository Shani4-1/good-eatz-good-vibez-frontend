import { useEffect, useState } from 'react';
import './App.css';
import MenuItems from './components/MenuItems';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [menuOptions, setMenuOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/menuItems`);
      const { data, error: errorMsg } = await response.json();
      if (response.ok) {
        setMenuOptions(data);
      } else {
        throw new Error(errorMsg);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchData();
    }, []);

    const renderContent = () => {
      if (loading) {
        return <div  className="Loading">Loading...</div>
      } else if (error) {
        return <div className="Error"> Error: {error}</div>
      } else {
        return < MenuItems menuOptions={menuOptions} />
      }
    };

  return (
    <div className="App">{renderContent()}</div>
  );
}

export default App;
