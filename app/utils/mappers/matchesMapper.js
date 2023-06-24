module.exports = (matches) => {
  return matches.map((match) => ({
    id: match.id,
    status: match.status,
    utcDate: match.utcDate,
    homeTeamName: match.homeTeam.name,
    homeTeamCrest: match.homeTeam.crest,
    homeTeamScore: match.score.fullTime.home,
    awayTeamName: match.awayTeam.name,
    awayTeamCrest: match.awayTeam.crest,
    awayTeamScore: match.score.fullTime.away,
  }));
};
