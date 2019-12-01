function merge(A, B) {
  const m = A.length;
  const n = B.length;
  let i = 0;
  let j = 0;
  let merged = [];
  while (i < m && j < n) {
    if (A[i] < B[j]) {
      merged.push(A[i])
      i += 1
    } else if (A[i] > B[j]) {
      merged.push(B[j])
      j += 1
    } else  {
      let ii = i;
      let jj = j; 
      let c = A[ii];
      while (ii < m && jj < n && A[ii] === B[jj]) {
        if (A[ii] > c) {
          merged = [...merged, ...A.substring(i, ii)];
          merged = [...merged, ...A.substring(j, jj)];
          // merged.append(A[i:ii])
          // merged.append(B[j:jj])
          i = ii
          j = jj
          c = A[ii]
        }
        ii += 1
        jj += 1
      }
      if (ii === m) {
        merged.push(B[j])
        j += 1;
      } else if (jj === n) {
        merged.push(A[i])
        i += 1
      } else {
        if (A[ii] < B[jj]) {
          merged.push(A[i])
          i += 1
        } else {
          merged.push(B[j])
          j += 1
        }
      }
    }
  }
  return [...merged, ...A.substring(i), ...B.substring(j)].join('');
}
def merge(A, B):
    m, n = len(A), len(B)
    i, j = 0, 0

    merged = []

    while i < m and j < n:
        if A[i] < B[j]:
            merged.append(A[i])
            i += 1
        elif A[i] > B[j]:
            merged.append(B[j])
            j += 1
        else:
            ii, jj = i, j
            c      = A[ii]

            while ii < m and jj < n and A[ii] == B[jj]:
                if A[ii] > c:
                    merged.append(A[i:ii])
                    merged.append(B[j:jj])
                    i = ii
                    j = jj
                    c = A[ii]
                ii += 1
                jj += 1

            if ii == m:
                merged.append(B[j])
                j += 1
            elif jj == n:
                merged.append(A[i])
                i += 1
            else:
                if A[ii] < B[jj]:
                    merged.append(A[i])
                    i += 1
                else:
                    merged.append(B[j])
                    j += 1

    return ''.join(merged) + A[i:] + B[j:]




function morganAndString(a, b) {
  let final = [];
  let myB = b;
  let myA = a;
  let i = 0;
  let j = 0;
  while (final.length !== (a.length + b.length)) {
      // const someA = myA[i];
      // const someB = myB[j];
      if (!someA) {
        final = [...final, ...myB.substring(j, myB.length)];
        break;
      }
      if (!someB) {
        final = [...final, ...myA.substring(i, myA.length)];
        // final = [...final, ...myA];
        break;
      }
    
      // if (someA.localeCompare(someB) < 0) {
      if (myA[i] < myB[j]) {
          // myA = myA.substring(1, myA.length);
          final.push(myA[i]);
          i++;
      // } else if (someA.localeCompare(someB) > 0) {
      } else if (myA[i] > myB[j]) {
    
          // myB = myB.substring(1, myB.length);
          final.push(myB[j]);
          j++;
      // } else if (someA.localeCompare(someB) === 0) {
      } else if (someA === someB) {
          if (myA[i + 1] < myB[j + 1]) {
              // myA = myA.substring(1, myA.length);
              final.push(someA);
              i++;
            } else {
              // myB = myB.substring(1, myB.length);
              final.push(someB);
              j++;
          }
      }
  }
  // final = [...]
  return final.join("");
}
