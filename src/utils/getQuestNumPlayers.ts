/**
 *  @param quest - Index of quest.
 *  @param numPlayers - Number of players.
 *  @returns The number of players who go on the quest.
 */
export const getQuestNumPlayers = (quest: number, numPlayers: number) => {
  const data = [
    [2, 2, 2, 3, 3, 3],
    [3, 3, 3, 4, 4, 4],
    [2, 4, 3, 4, 4, 4],
    [3, 3, 4, 5, 5, 5],
    [3, 4, 4, 5, 5, 5],
  ];

  return data[quest][numPlayers - 5];
};
