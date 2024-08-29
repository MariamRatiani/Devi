// import { LRLanguage, LanguageSupport } from '@codemirror/language';
// import { styleTags, tags as t } from '@lezer/highlight';
// import { parser as georgianParser } from './georgianParser'; // Adjust this path to your actual parser file
//
// // Use the generated parser and configure it with your styleTags
// const customParser = georgianParser.configure({
//     props: [
//         styleTags({
//             "keyword": t.keyword,
//             "identifier": t.variableName,
//             "number": t.number,
//             "string": t.string,
//             "comment": t.comment,
//             // Add other styles as needed
//         })
//     ]
// });
//
// const GeorgianLanguage = LRLanguage.define({
//     parser: customParser,
//     languageData: {
//         // Define comment syntax, if any
//         commentTokens: { line: "//" },
//     }
// });
//
// export function georgian() {
//     return new LanguageSupport(GeorgianLanguage);
// }
