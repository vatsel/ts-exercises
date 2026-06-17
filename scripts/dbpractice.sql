-- name | avg_tensile_strength 
-- ONLY avg_tensile_strength > 50
-- ONLY completed experiments

SELECT
    p.name,
    AVG(m.value) AS avg_tensile_strength
FROM projects p
JOIN experiments e 
    ON e.project_id=p.id
JOIN measurements m 
    ON m.experiment_id=e.id
WHERE 
    p.team='Coatings'
    AND e.status = 'complete'
    AND m.parameter_name='tensile_strength'
GROUP BY 
    p.id, 
    p.name
HAVING AVG(m.value) > 50
ORDER BY avg_tensile_strength DESC
LIMIT 3
;
