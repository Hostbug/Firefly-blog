import os
import json


def generate_music_json(music_dir):
    """扫描目录下的 .mp3 和 .lrc 文件，生成音乐配置列表"""
    files = os.listdir(music_dir)

    mp3_files = {}
    lrc_files = {}

    for f in files:
        if f.endswith('.mp3'):
            mp3_files[f[:-4]] = f
        elif f.endswith('.lrc'):
            lrc_files[f[:-4]] = f

    music_list = []

    for base_name in sorted(mp3_files.keys()):
        mp3_file = mp3_files[base_name]
        lrc_file = lrc_files.get(base_name, "")

        if ' - ' in base_name:
            parts = base_name.split(' - ', 1)
            song_name = parts[0].strip()
            artist = parts[1].strip()
        else:
            song_name = base_name
            artist = "未知歌手"

        music_list.append({
            "name": song_name,
            "artist": artist,
            "url": f"Firefly-blog/src/assets/music/{mp3_file}",
            "cover": "",
            "lrc": f"Firefly-blog/src/assets/music/{lrc_file}" if lrc_file else "",
        })

    return music_list


def write_music_config(music_dir, output_path=None):
    """
    生成 Firefly 音乐配置并写入 txt 文件

    Args:
        music_dir: 音乐文件目录
        output_path: 输出文件路径，默认生成到 music_dir/music_config.txt
    """
    if output_path is None:
        output_path = os.path.join(music_dir, "music_config.txt")

    music_list = generate_music_json(music_dir)

    lines = ["// music-set"]
    for item in music_list:
        lines.append("            {")
        lines.append(f'                name: "{item["name"]}",')
        lines.append(f'                artist: "{item["artist"]}",')
        lines.append(f'                url: "{item["url"]}",')
        lines.append(f'                cover: "{item["cover"]}",')
        lines.append(f'                lrc: "{item["lrc"]}",')
        lines.append("            },")

    # # 追加 JSON 格式
    # lines.append("")
    # lines.append("// JSON 格式")
    # lines.append(json.dumps(music_list, ensure_ascii=False, indent=4))

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"配置已生成: {output_path}")
    print(f"共 {len(music_list)} 首歌曲")
    return output_path


# ========== 运行 ==========
MUSIC_DIR = r"G:\Firefly-blog\src\assets\music"

if __name__ == "__main__":
    if not os.path.exists(MUSIC_DIR):
        print(f"[错误] 目录不存在: {MUSIC_DIR}")
    else:
        write_music_config(MUSIC_DIR)