# AMBOSS SI Unit Estimator

Chrome extension built to help non-American med students use the [Amboss](https://www.amboss.com/us) platform just a bit more efficiently.
<br>Because of the nature of some of the conversions (ie some needing calculation using molar weights etc..), this extension is only meant to help give the user a general idea of what value to expect when converting the reference unit to SI.

---------------------

The Extension makes use of a pre-defined lab data table stored as a JSON to determine what values need to be estimated and from what unit to what unit. [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) are then used to pinpoint potential values for estimation.
<br>Because of the inconsistency of naming (ie: abbreviations, shorthand, etc.. ) the candidate data table key has to be deduced from the intersection of what keywords are mentioned in either the paragraph or table in question as well as what units are present.

Screenshots below!

---------------------

![image](/projects/amboss-extension/sample_01.png "Use case 1") 
![image](/projects/amboss-extension/sample_02.png "Use case 2") 

---------------------

## To Do

- [ ] Docs
- [ ] Clean up UI
- [ ] Community database 


---------------------

## LINKS

* [Find the project here](https://github.com/null-usr/AmbossEXT)