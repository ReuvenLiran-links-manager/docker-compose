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