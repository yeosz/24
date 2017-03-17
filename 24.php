<?php

if(count($argv) != 5) die('参数异常');
array_shift($argv);

$result = permutation($argv);

$result = getExpression($result);
$result = array_unique($result);

$out = [];
foreach ($result as $v)
{
    $str = "return {$v};";
    $result = @eval($str);
    if(round($result, 8) == 24) $out[] = substr($str, 7);
}
print_r($out);
die;

/**
 * 获取所有表达式
 * @param array $data
 * @return array
 */
function getExpression($data)
{
    // 情况1:两两分组
    $rs = [];
    foreach($data as $v)
    {
        $a = getAllResult($v[0], $v[1]);
        $b = getAllResult($v[2], $v[3]);
        foreach($a as $v1)
        {
            foreach($b as $v2)
            {
                $tmp = getAllResult($v1, $v2);
                $rs = array_merge($tmp, $rs);
            }
        }
    }

    // 情况2:依次运算
    for($i=1; $i<4; $i++)
    {
        $result = [];
        foreach ($data as $id=>&$v)
        {
            $tmp = $v;
            unset($tmp[0], $tmp[1]);
            $temp = getAllResult($v[0], $v[1]);
            foreach($temp as $t)
            {
                $result[] = array_merge([$t], $tmp);
            }
            unset($data[$id]);
        }
        $data = $result;
    }

    $result = array_map('current', $data);
    return array_merge($rs, $result);
}

/**
 * 两个数的所有运算结果
 * @param int $a
 * @param int $b
 * @return array
 */
function getAllResult($a, $b)
{
    $result = [];
    $result[] = "({$a}+{$b})";
    $result[] = "({$a}-{$b})";
    $result[] = "({$b}-{$a})";
    $result[] = "({$a}*{$b})";
    $result[] = "({$a}/{$b})";
    $result[] = "({$b}/{$a})";
    return $result;
}


/**
 * 排列
 * @param $arr
 * @return array
 */
function permutation($arr)
{
    $count = count($arr);
    if($count==1)
    {
        return [$arr];
    }
    else
    {
        $result = [];
        foreach($arr as $id=>&$v)
        {
            $temp = $arr;
            $now = $temp[$id];
            unset($temp[$id]);
            $result1 = permutation($temp);
            foreach($result1 as $vv)
            {
                array_unshift($vv, $now);
                $result[] = $vv;
            }
        }
        return $result;
    }
}
