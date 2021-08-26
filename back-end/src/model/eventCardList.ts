import { Card } from "./card";

export const EventCardList: Card[] = [
    new Card('God\'s Wrath', 'If Religiosity is less than 12, +3 Religiosity, -3 Food Stockpile, -5 Money, -5 Military Advantage, -5 Noble Satisfaction, -6 Foreign Relations, -6 Peasant Satisfaction', false),
    new Card('Famine', '-1 Food Stockpile, -4 Money, -8 Foreign Relations', false),
    new Card('Pirates', 'If Military Advantage is less than 12, -1 Legal Integrity, -1 Peasant Satisfaction, -2 Military Advantage, -2 Foreign Relations, -3 Noble Satisfaction, -5 Food Stockpile, -8 Money', false),
    new Card('Peasant Revolt', 'If Peasant Satisfaction is less than 12, +2 Peasant Satisfaction, -1 Religiosity, -2 Money, -2 Noble Satisfaction, -2 Foreign Relations, -6 Military Advantage, -8 Legal Integrity', false),
    new Card('Noble Revolt', 'If Noble Satisfaction is less than 12, +2 Noble Satisfaction, -1 Religiosity, -2 Money, -2 Foreign Relations, -2 Peasant Satisfaction, -6 Military Advantage, -8 Legal Integrity', false),
    new Card('Repeating History', 'Shuffle the event recycle pile and place it on top of the event draw deck, ', false),
    new Card('Legal Shutdown', 'No card may be repealed except this card, ', true),
    new Card('Coup D\'edat', 'The monarch swaps roles with the cabinet member with the lowest metric. If there is a tie for lowest, a vote is held where the candidates are the tied cabinet members., ', false),
    new Card('Evilland Attacks', 'If Foreign Relations is less than 12, -2 Foreign Relations, -3 Money, -3 Food Stockpile, -4 Military Advantage, -6 Noble Satisfaction, -6 Peasant Satisfaction', false),
    new Card('Cults Arise', 'If Religiosity is less than 12, -3 Military Advantage, -4 Religiosity, -6 Legal Integrity, -6 Food Stockpile', false),
    new Card('Secular', '+1 Food Stockpile, -3 Noble Satisfaction, -3 Peasant Satisfaction, -8 Religiosity', false),
    new Card('Imprisonment', 'You may attempt to guess the spy by vote. If you guess correctly, the game is over and the monarch wins. If you guess incorrectly, -4 on the accused\'s metric, -4 Religiosity, -4 Noble Satisfaction, -6 Food Stockpile, -7 Legal Integrity', false),
    new Card('Plague', '-4 Military Advantage, -4 Noble Satisfaction, -8 Peasant Satisfaction', false),
    new Card('Constitutional Crisis', 'If Legal Integrity is less than 12, -2 Military Advantage, -3 Legal Integrity, -4 Money, -4 Noble Satisfaction, -4 Food Stockpile', false),
    new Card('Run on the Banks', 'If Money is less than 12, -3 Food Stockpile, -3 Peasant Satisfaction, -5 Religiosity, -5 Noble Satisfaction, -5 Foreign Relations', false),
    new Card('Bad Harvest', 'If Food is less than 12, -3 Food Stockpile, -4 Foreign Relations, -5 Money, -5 Religiosity, -7 Peasant Satisfaction', false),
    new Card('Lack of Creativity', 'Shuffle the proposal recycle deck and place it on top of the proposal draw deck, -1 Money, -1 Military Advantage, -1 Religiosity, -1 Legal Integrity, -1 Noble Satisfaction, -1 Food Stockpile, -1 Foreign Relations, -1 Peasant Satisfaction', false),
]