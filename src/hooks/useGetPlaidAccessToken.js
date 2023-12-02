
const getPlaidAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: loginRequest.scopes,
          account: account,
        })
        .then((response) => {
          if (response) {
            setAccessToken(response.accessToken);
          }
        });
    }
  }, [account, instance]);

  return accessToken;
};
export { getPlaidAccessToken };