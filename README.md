# 批量文件重命名脚本

> 只对文件进行重命名
> 切换到脚本目录

    查看帮助
    node rename --help
    
    用法
    node rename -src src -dist dist -n test- -i 100
    
<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>-src</td>
          <td>处理文件源目录</td>
        </tr>
        <tr>
          <td>-dist</td>
          <td>生成文件存放目录</td>
        </tr>      
        <tr>
          <td>-n</td>
          <td>文件名称前缀</td>
        </tr>
        <tr>
          <td>-i</td>
          <td>文件索引，默认：0</td>
        </tr>        
    </tbody>
</table>

## 示例

![rename](http://ox2ualtw3.bkt.clouddn.com/node-rename2.gif)
