module.exports = (competitions) => {
  return competitions.map((competition) => ({
    id: competition.id,
    code: competition.code,
    name: competition.name,
    type: competition.type,
    emblem: competition.emblem,
    startDate: competition.currentSeason.startDate,
    endDate: competition.currentSeason.endDate,
  }));
};
