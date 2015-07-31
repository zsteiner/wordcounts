#About campaign word counts
Back in 2008, while working on a conference submission (and thus hypersensitive to word counts), I wrote a [blog post][1] about word counts on campaign policy position statements. I noticed there was a huge range of ink spilled on various issues between the two candidates at the time. I intended to do a follow up in 2012, but I was otherwise occupied during the election (dissertation, graduating, moving). However, 2016 is proving to be an interesting election cycle. There is a huge field of very diverse candidates ranging from experienced politicians to relative unknowns. I decided to expand the concept as an interactive data visualization. As a comparison, 2008 McCain and Obama and 2012 Romney (actually late 2011, for fairer comparison to the 2016 crop) are included as reference. Immediately noticeable is the fact that many candidates have a lot written already on issues, whereas eight have no policy/issue offerings on their website. This does not seem to be a partisan divide; there are verbose and laconic candidates from both parties. Granted this is still early in the election cycle and many of the campaigns are still nascent. I suspect policy positions will become more substantive for the two remaining candidates after the primaries, as they were for McCain, Obama, and Romney. I will update the underlying data as candidates join, leave, or update their sites.

My methodology is simple: I copied and pasted the full text of pages or PDFs into a word processor and recorded the word count. For those candidates that offer a summary in addition to a full policy policy paper (typically as a PDF or eBook download), I use the full paper text (for example Romney's 39,987 word economic tome). The number of issues for each candidate reflects those presented on the candidate's site, rather than the count of my categories. My categories collapse specific issues for clearer cross-candidate comparisons. For instance, I include tax and job issues under the umbrella of Economy; defense spending and Iran policy under Foreign Policy. A lot of disparate issues get lumped into Social Issues—including criminal justice, 2nd Amendment, voting rights, income inequality, marriage equality, religious liberty, etc. I tried to keep the same issue categories from 2008 for better comparison. I did remove Iraq (not an issue written about in 2015) and added Environment and Social Issues (discussed now more than in 2008). Also, I noticed that every candidate, whether they had policy information or not, devoted a section of their site to biography, so I included word counts for those as well. New categories are marked with a *

###The Issues
- Economy
- Education
- Energy
- Foreign Policy
- Health Care
- Technology
- Social Issues *
- Environment *
- Biography *

Average word counts are for my reported categories. For all of these, the absolute values of numbers is less interesting than the comparisons between candidates. None of this is intended as an endorsement or rejection of the actual content of the policy positions. There are can be better articulated 1,000 word positions than 10,000 word positions, though I do find the 100 to 20,000 word difference interesting. This visualization is an examination of the messaging strategies candidates employ, rather than a critique of candidates' platforms. I'm putting a lens to the depth and breadth that candidates choose for various important issues.

You will see all of the current candidates on the left sidebar (or in the mobile drawer). You can toggle as many candidates for comparisons, though I'd recommend 6-8 for easy visual comparison. The buttons below the chart allow you to switch between word counts per issue, total issues covered, and average words overall. All three retain the selected candidates. Below the graph, you can see a summary of the candidate and clicking "learn more" takes you to their official site.

My raw data can be examined for accuracy: [Issues][2], [Issue Counts][3], and [Average Word Counts][4]. All are in JSON format.


#Notes
Romney 2012 had two massive policy papers outlining economic and foreign policies, thus the much larger word counts. Economic policy was divided into 7 individual issues. I broke out Energy.

Clinton covers Policy in “Four Fights” section. Economy is “Building an economy for tomorrow”. Foreign Policy is covered in “Defending America and our core values.”

Christie has four PDF policy papers. “Entitlement Reform” is mainly about Medicare and Medicaid so I included it in Health Care, but it could also be included under Economy. Christie's about section is a video with photo collage with captions.

Marco Rubio’s larger word count for Foreign Policy comes from a series of op-ed articles he wrote ranging from “Cuba”, “Iran”, “Iran, Part 2”, “Europe”, “Israel”, and “Defense Spending”. These were previously published in various magazines and websites.

Santorum has not officially released his economic plan as of the end of July, but the site teases that is coming soon. I will update when it is published.

For Jim Webb, I combined “Economic Fairness” and “National Infrastructure” for economy.

I updated the biography word counts for 2008 McCain and Obama from archive.org cached versions of their sites.


#Technical Information
All data is from candidate websites as of the date updated. This visualization was built with JavaScript and HTML/CSS3. Charts are generated from data files using [c3.js][5], which is based on [d3.js][6]. Scrolling is provided by iScroll.

[1]: http://zachsteiner.com/2008/09/presidential-word-counts/
[2]: http://portfolio.zachsteiner.com/wordcounts/data/issues.json
[3]: http://portfolio.zachsteiner.com/wordcounts/data/count.json
[4]: http://portfolio.zachsteiner.com/wordcounts/data/average.json
[5]: https://github.com/masayuki0812/c3
[6]: https://github.com/mbostock/d3
