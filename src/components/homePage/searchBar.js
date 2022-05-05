import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState(null);
    const history = useHistory();
    const routeChange = () => {
        let path = `/search?query=${query}`;
        history.push(path);
    };
    return (
        <div className="searchbar">
            <form
                type="submit"
                onSubmit={() => {
                    onSearch(query);
                    routeChange();
                }}
            >
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search for a movie, tv show, person..."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                onSearch(query);
                                routeChange();
                            }}
                        >
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
        </div>
    );
};

export default SearchBar;
