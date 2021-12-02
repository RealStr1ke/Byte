/**
 * Converts a string to Title Case
 * @description This is designed to also ensure common Discord PascalCased strings
 * 				are put in their TitleCase titleCaseVariants. See below for the full list.
 * @param str The string to title case
 * @terms
 * This table lists how certain terms are converted, these are case insensitive.
 * Any terms not included are converted to regular Titlecase.
 *
 *      | Term            |    Converted To |
 *      |-----------------|-----------------|
 *      | textchannel     |     TextChannel |
 *      | voicechannel    |    VoiceChannel |
 *      | categorychannel | CategoryChannel |
 *      | guildmember     |     GuildMember |
 */
export declare function toTitleCase(str: string): string;
//# sourceMappingURL=toTitleCase.d.ts.map