import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormControl, Button, Card } from "react-bootstrap";

function GithubUsers() {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    axios.get(`https://api.github.com/users/${userInput}`).then((res) => {
      if (res.data.message) {
        setError(res.data.message);
      } else {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    axios.get("https://api.github.com/users/example").then((res) => {
      setData(res.data);
    });
  }, []);

  const setData = ({
    name,
    following,
    followers,
    avatar_url,
    public_repos,
    login,
  }) => {
    setUserName(login);
    setAvatar(avatar_url);
    setName(name);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
  };

  return (
    <div>
      <div className="search">Github Users</div>
      <div className="searchInput">
        <Form inline>
          <FormControl
            type="text"
            name="github user"
            placeholder="Search"
            className="mr-sm-2"
            onChange={handleSearch}
          />
          <Button variant="outline-info" onClick={handleClick}>
            Search
          </Button>
        </Form>
      </div>
      { error ? (
        <h1> {error} </h1>
      ) : (
        <div className="card">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Title>Name: {name}</Card.Title>
              <Card.Title>UserName: {userName}</Card.Title>
              <Card.Title>Followers: {followers}</Card.Title>
              <Card.Title>Following: {following}</Card.Title>
              <Card.Title>Repos: {repos}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default GithubUsers;
